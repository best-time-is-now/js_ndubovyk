const { I } = inject();

module.exports = {
  colorDropDown: { xpath: '//label[text()="Color"]/following-sibling::div/a[1]' },
  sizeDropDown: { xpath: '//label[text()="Size"]/following-sibling::div/a[1]' },
  colorOption: { xpath: '//label[text()="Color"]/following-sibling::div/ul/li[2]' },
  sizeOption: { xpath: '//label[text()="Size"]/following-sibling::div/ul/li[2]' },
  productPriceText: { xpath: '//*[@id="content"]/div[1]/div[2]/div/div[1]/span[1]' },

  async selectColor() {
    if (await I.checkElementExists(this.colorDropDown)) {
      I.click(this.colorDropDown);
      I.click(this.colorOption);
    }
  },

  async selectSize() {
    if (await I.checkElementExists(this.sizeDropDown)) {
      I.click(this.sizeDropDown);
      I.click(this.sizeOption);
    }
  },

  async getProductPrice() {
    const draftProductPrice = await I.grabTextFrom(this.productPriceText);
    const draftPrice = await I.parsePrice(draftProductPrice);

    const draftColorPrice = await I.grabTextFrom(this.colorOption);
    const colorPrice = await I.parsePrice(draftColorPrice);

    const draftSizePrice = await I.grabTextFrom(this.sizeOption);
    const sizePrice = await I.parsePrice(draftSizePrice);
    return draftPrice + colorPrice + sizePrice;
  },
}
