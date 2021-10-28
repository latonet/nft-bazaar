import {XummSdk} from 'xumm-sdk'

const main = async () => {
  try {
    const Sdk = new XummSdk()

    // Get the xApp context data based on the UUID in the
    // Query param (URL GET param) `xAppToken`.

    // NOTE!!
    //   While developing, you may want to re-fetch your OTT to be able
    //   to refresh your xApp page in your browser. Read this section
    //   to learn how to be able to re-fetch an OTT during development:
    //     > https://xumm.readme.io/reference/xappotttoken#development-re-fetch-ott-data-page-refresh

    console.log('get', await Sdk.xApp.get('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'))

    // Send a push notification that shows up as an event, that opens
    // your xApp. To remove this from the event list of the user, the
    // event should be cancelled using the SDK, using the:
    //   `Sdk.payload.cancel(...)`
    // method. The UUID to pass to the cancel method is available in the
    // OTT data (see first (`xApp.get`) method).
    console.log('event', await Sdk.xApp.event({
      user_token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      subtitle: 'Some Push Message Title (iOS only)',
      body: 'Some Push Message (iOS + Android)',
      data: {
        tx: '901AB6028204AE3EDB4D919EFC0BF36A25F73975674DCCA3FC54AEA85D9F56A0',
        account: 'rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ'
      }
    }))

    // Send a push notification to the user, on opened the xApp
    // opens (once).
    console.log('push', await Sdk.xApp.push({
      user_token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      subtitle: 'Some Push Message Title (iOS only)',
      body: 'Some Push Message (iOS + Android)',
      data: {
        tx: '901AB6028204AE3EDB4D919EFC0BF36A25F73975674DCCA3FC54AEA85D9F56A0',
        account: 'rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ'
      }
    }))

  } catch (e) {
    console.log({
      error: e.message,
      stack: e.stack
    })
  }
}

main()
