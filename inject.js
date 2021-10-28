// Sample: try URL:
//   https://livenet.xrpl.org/accounts/rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ

window.fetch('https://xumm.app/api/v1/platform/kyc-status/' + document.querySelector('h2.classic').textContent)
    .then(r => r.json())
    .then(r => r.kycApproved)
    .then(r => {
        if (r) {
            var kyc = document.createElement('img')
            kyc.width = 120
            kyc.src = 'https://cdn.xumm.pro/kyc-check-xumm.svg'
            kyc.style = 'cursor: pointer; margin-top: 5px;'
            kyc.onclick = () => {
                window.open('https://xumm.app')
            }
            document.querySelector('div.box-header').appendChild(kyc)
        }
    })
