const Helper = require('@codeceptjs/helper');

class CheckElementExists extends Helper {
  async checkElementExists(element) {
    return Boolean(await this.helpers['Playwright'].grabNumberOfVisibleElements(element));
  }

  async tryElementExist(element) {
    return await tryTo(() => this.helpers['Playwright'].see(element));
  }
}

module.exports = CheckElementExists;
