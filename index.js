const lib = require('xrpl-accountlib')
const { XrplClient } = require('xrpl-client')

const account = 'r...'
const currency = 'xyz'
const secret = 's...'

const client = new XrplClient()
const keypair = lib.derive.familySeed(secret)

const main = async () => {
  console.log('Getting ready...')
  await client.ready()
  const { account_data } = await client.send({ command: 'account_info', account })

  let marker = ''
  const fix = []
  while (typeof marker === 'string') {
    const lines = await client.send({ command: 'account_lines', account, marker: marker === '' ? undefined : marker })
    marker = lines?.marker === marker ? null : lines?.marker
    const toFix = lines.lines.filter(a => a.no_ripple || a.limit !== '0')
    if (toFix.length === 0) {
      // Assume done after account flag enabled
      marker = null
    }
    console.log(`Got ${lines.lines.length} results, to fix: ${toFix.length}`)
    toFix.forEach(t => fix.push(t.account))
  }

  console.log('To fix # Trust Lines:', fix.length)

  const txTemplate = { TransactionType: 'TrustSet', Account: account, Fee: '12', Flags: 262144 }

  for await (acc of fix) {
    const tx = Object.assign({}, {
      ...txTemplate,
      Sequence: account_data.Sequence + fix.indexOf(acc),
      LimitAmount: { currency, issuer: acc, value: 0 }
    })
    const {signedTransaction} = lib.sign(tx, keypair)
    const submit = await client.send({ command: 'submit', 'tx_blob': signedTransaction })
    console.log(submit.engine_result, submit.engine_result_message)
  }

  console.log('Shutting down...')
  client.close()
}

main()
