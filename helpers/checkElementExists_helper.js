const Helper = require('@codeceptjs/helper');

class CheckElementExists extends Helper {
  async checkElementExists(element) {
    return Boolean(await this.helpers['Playwright'].grabNumberOfVisibleElements(element));
  }

  async tryElementExist(element) {
    try {
      await this.helpers['Playwright'].seeElement(element);
      return true;
    } catch {
      return false;
    }   
  }
}

module.exports = CheckElementExists;
