const Helper = require('@codeceptjs/helper');

class PriceConverter extends Helper {
  parsePrice(fieldText) {
    const numberRegex = /[0-9.]+/g;
    return parseFloat(numberRegex.exec(fieldText));
  }

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

}

module.exports = PriceConverter;
