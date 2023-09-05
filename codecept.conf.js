const {
  setHeadlessWhen,
  setCommonPlugins
} = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://opencart.qatestlab.net/',
      show: true,
      waitForNavigation: 'networkidle',
      waitForTimeOut: 5000,
      windowSize: '1200x900',
    },

    ChaiWrapper: {
      require: "codeceptjs-chai"
    },
    
    PriceConverter: {
      require: './helpers/priceconverter_helper.js',
    },
  },
  include: {
    I: './steps_file.js',
    basePage: './pages/base.js',
    accountPage: "./pages/account.js",
    productPage: "./pages/product.js",
    cartPage: "./pages/cart.js",
  },
  name: 'js_ndubovyk'
}