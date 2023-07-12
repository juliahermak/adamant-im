// eslint-disable-next-line @typescript-eslint/no-var-requires
const { notarize } = require('@electron/notarize')

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context

  if (electronPlatformName !== 'darwin') {
    return
  }

  if (process.env.APPLE_NOTARIZE !== 'true') {
    console.log('APPLE_NOTARIZE=false | Skipping the notarization"')
    return
  }

  const appName = context.packager.appInfo.productFilename

  console.log(`Preparing the app ${appName} for notarization`)

  return notarize({
    appBundleId: 'im.adamant.msg',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASS,
    teamId: process.env.APPLE_TEAM_ID
  })
}
