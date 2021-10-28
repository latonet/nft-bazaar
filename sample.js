const {XrplClient} = require('xrpl-client')

const connection = new XrplClient('wss://testnet.xrpl-labs.com')

const main = async () => {
  const offers = (await Promise.all((await connection.send({
    command: 'account_objects',
    account: 'rLyYk3V8siKuUSyHrBfHXnEx7YxhatgmyC',
    type: 'offer',
    limit: 100
  })).account_objects.map(async openOffer => {
    Object.assign(openOffer, {
      originalTx: await connection.send({
        command: 'tx',
        transaction: openOffer.PreviousTxnID
      })
    })
    return openOffer
  }))).map(offer => {
    return {
      offerHash: offer.BookDirectory,
      createHash: offer.originalTx.hash,
      now: {
        gets: offer.TakerGets,
        pays: offer.TakerPays
      },
      original: {
        gets: offer.originalTx.TakerGets,
        pays: offer.originalTx.TakerPays
      },
      openPercentage: Number(offer.TakerGets?.value || offer.TakerGets)
        / Number(offer.originalTx.TakerGets?.value || offer.originalTx.TakerGets)
        * 100
    }
  })
  console.log(offers)
}

main()
