const Helper = require('@codeceptjs/helper');

class CheckElementExists extends Helper {
  async checkElementExists(element) {
    return Boolean(await this.helpers['Playwright'].grabNumberOfVisibleElements(element));
  }

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

}

module.exports = CheckElementExists;
