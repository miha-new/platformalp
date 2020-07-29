module.exports = {
  pwa: {
    name: 'Platformalp',
    themeColor: '#FFFFFF',
    msTileColor: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      display: 'landscape',
      background_color: '#FFFFFF'
    },
    workboxPluginMode: 'GenerateSW'
  }
}