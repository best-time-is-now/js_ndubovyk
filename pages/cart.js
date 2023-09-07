const { I } = inject();

module.exports = {
  firstNameField: { xpath: '//input[@type="text"][@id="input-payment-firstname"]' },
  lastNameField: { xpath: '//input[@type="text"][@id="input-payment-lastname"]' },
  addressField: { xpath: '//input[@id="input-payment-address-1"]' },
  cityField: { xpath: '//*[@id="input-payment-city"]' },
  postcodeField: { xpath: '//*[@id="input-payment-postcode"]' },
  countryDropdown: { xpath: '//a[@class="sbToggle"]' },
  country: { xpath: '//li[a[text()="United States"]]' },
  region_Dropdown: { xpath: '//div[@class="sbHolder"]/following::div[@class="col-sm-10"]' },
  region_state: { xpath: '//li[a[text()="New York"]]' },
  continueButton: { xpath: '(//input[@id="button-payment-address"])' },
  continueStep2Button: { xpath: '(//div[@class="pull-right"]/input[@id="button-payment-address"])[1]' },
  continueStep3Button: { xpath: '(//input[@id="button-shipping-address"])[1]' },
  continueStep4Button: { xpath: '//input[@id="button-shipping-method"][1]' },
  step5ConditionsAccepting: { xpath: '//input[@id="agree1"]' },
  continueStep5Button: { xpath: '(//input[@id="button-payment-method"])[1]' },
  flatShippingRate: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[2]/td[2]' },
  ecoTax: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[3]/td[2]' },
  vat: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[4]/td[2]' },
  total: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[5]/td[2]' },
  confirmOrderButton: { xpath: '//*[@id="button-confirm"]' },
  successfulPurchaseText: { xpath: '//*[@id="content"]/h1/text()' },

  fillCheckoutForm(customer) {
    if (!this.firstNameField.value) {
      I.fillField(this.firstNameField, customer.firstName);
    }

    if (!this.lastNameField.value) {
      I.fillField(this.lastNameField, customer.lastName);
    }

    if (!this.addressField.value) {
      I.fillField(this.addressField, customer.address);
    }

    if (!this.cityField.value) {
      I.fillField(this.cityField, customer.city);
    }

    if (!this.postcodeField.value) {
      I.fillField(this.postcodeField, customer.postcode);
    }

    if (I.seeElement(countryDropdown)) {
      I.click(this.countryDropdown);
    }

    if (I.seeElement(country)) {
      I.click(this.country);
    }

    if (I.seeElement(region_Dropdown)) {
      I.click(this.region_Dropdown);
    }

    if (I.seeElement(region_state)) {
      I.click(this.region_state);
    }

    I.click(this.continueButton);

    I.click(this.continueStep2Button);

    I.waitForVisible(this.continueStep3Button);
    I.click(this.continueStep3Button);

    I.waitForVisible(this.continueStep4Button);
    I.click(this.continueStep4Button);

    I.waitForVisible(this.step5ConditionsAccepting);
    I.click(this.step5ConditionsAccepting);

    I.waitForVisible(this.continueStep5Button);
    I.click(this.continueStep5Button);
  },

  async getTax() {
    const shippingRate = await I.grabTextFrom(this.flatShippingRate);
    const shippingRateParse = I.parsePrice(shippingRate);

    const eco = await I.grabTextFrom(this.ecoTax);
    const ecoParse = I.parsePrice(eco);

    const vatTax = await I.grabTextFrom(this.vat);
    const vatParse = I.parsePrice(vatTax);
    return +shippingRateParse + ecoParse + vatParse;
  },

  async getTotalPrice() {
    const finalPrice = await I.grabTextFrom(this.total);
    return I.parsePrice(finalPrice);
  },

  clickConfirmOrder() {
    I.click(this.confirmOrderButton);
  },

  verifySuccessfulPurchase() {
    I.seeTextEquals('Your order has been placed!', this.successfulPurchaseText);
  }
}
