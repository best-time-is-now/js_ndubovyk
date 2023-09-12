const { I } = inject();

module.exports = {
  colorDropDown: { xpath: '//label[text()="Color"]/following-sibling::div/a[1]' },
  sizeDropDown: { xpath: '//label[text()="Size"]/following-sibling::div/a[1]' },
  colorOption: { xpath: '//label[text()="Color"]/following-sibling::div/ul/li[2]' },
  sizeOption: { xpath: '//label[text()="Size"]/following-sibling::div/ul/li[2]' },
  productPriceText: { xpath: '//*[@id="content"]/div[1]/div[2]/div/div[1]/span[1]' },
  addToCartButton: { xpath: '//button[@type="button"][@id="button-cart"][1]' },
  cartIcon: { xpath: '//i[@class="linearicons-cart"]' },
  checkoutButton: { xpath: '//a[@class="btn-primary btn-r"][1]' },
  notAvailableProduct: { xpath: '//*[@id="content"]/form/div/table/tbody/tr[1]/td[2]/span' },

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
    let colorPrice = 0;
    let sizePrice = 0;

    if (await I.tryElementExist(this.colorOption)) {
      const draftColorPrice = await I.grabTextFrom(this.colorOption);
      colorPrice = await I.parsePrice(draftColorPrice);
    }
    if (await I.tryElementExist(this.sizeOption)) {
      const draftSizePrice = await I.grabTextFrom(this.sizeOption);
      sizePrice = await I.parsePrice(draftSizePrice);
    }
    return draftPrice + colorPrice + sizePrice;
  },

  async proceedToCheckout() {
    await I.click(this.addToCartButton);
    await I.click(this.cartIcon);
  },

  async clickCheckoutButton() {
    await I.click(this.checkoutButton);
  },

  throwIfNotAvailable(isNotAvailable) {
    if (isNotAvailable) {
      throw new Error('Sorry, the product is not available');
    }
  },

  async checkProductIsNotAvailable() {
    return await I.checkElementExists(this.notAvailableProduct);
  },
}