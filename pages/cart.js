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
  continueButton: { xpath: '//input[@id="button-payment-address"]' },
  continueStep2Button: { xpath: '(//input[@id="button-payment-address"])[1]' },
  continueStep3Button: { xpath: '(//input[@id="button-shipping-address"])[1]' },
  continueStep4Button: { xpath: '(//input[@id="button-shipping-method"])[1]' },
  step5ConditionsAccepting: { xpath: '(//input[@id="agree1"])[1]' },
  continueStep5Button: { xpath: '(//input[@id="button-payment-method"])[1]' },
  flatShippingRate: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[2]/td[2]' },
  ecoTax: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[3]/td[2]' },
  vat: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[4]/td[2]' },
  total: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[5]/td[2]' },
  confirmOrderButton: { xpath: '//*[@id="button-confirm"]' },

  fillCheckoutForm(customer) {
    /* if (!this.firstNameField.value) {
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
      
      if (!this.postcodeField.value) {
        I.fillField(this.postcodeField, customer.postcode);
      }
      
      I.click(this.countryDropdown);
      I.click(this.country);
      I.click(this.region_Dropdown);
      I.click(this.region_state); */
    I.click(this.continueButton);
    I.click(this.continueStep2Button);

    I.waitForVisible(this.continueStep3Button, 5);
    I.click(this.continueStep3Button);

    I.waitForVisible(this.continueStep4Button, 5);
    I.click(this.continueStep4Button);

    I.waitForVisible(this.step5ConditionsAccepting, 5);
    I.click(this.step5ConditionsAccepting);

    I.waitForVisible(this.continueStep5Button, 5);
    I.click(this.continueStep5Button);
  },

  async getTax() {
    const shippingRate = await I.grabTextFrom(this.flatShippingRate);
    const shippingRateParse = parsePrice(shippingRate);

    const eco = await I.grabTextFrom(this.ecoTax);
    const ecoParse = parsePrice(eco);

    const vatTax = await I.grabTextFrom(this.vat);
    const vatParse = parsePrice(vatTax);
    return +shippingRateParse + ecoParse + vatParse;
  },

  async getTotalPrice() {
    I.grabTextFrom(this.total);
  },

  verifySuccessfulPurchase() {
    I.click(this.confirmOrderButton);
    I.seeTextEquals('Your order has been placed!', '//*[@id="content"]/h1/text()');
  }
}
