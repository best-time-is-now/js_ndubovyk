const Helper = require('@codeceptjs/helper');

class CheckElementExists extends Helper {
  async checkElementExists(element) {
    return Boolean(await this.helpers['Playwright'].grabNumberOfVisibleElements(element));
  }
}

module.exports = CheckElementExists;
