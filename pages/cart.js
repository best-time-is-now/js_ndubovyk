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
  existAddressDropdown: { xpath: '//div[@class="sbHolder"]/a[@class="sbSelector"]' },
  existAddress: { xpath: '//ul[@class="sbOptions"]/li[@class="last"]/a' },
  continueButton1: { xpath: '//div[@class="pull-right"]/input[@type="button"]' },

  
  
  fillCheckoutForm(customer) {
    I.fillField(this.firstNameField, customer.firstName);
    I.fillField(this.lastNameField, customer.lastName);
    I.fillField(this.addressField, customer.address);
    I.fillField(this.cityField, customer.city);
    I.fillField(this.postcodeField, customer.postcode);
    I.click(this.countryDropdown);
    I.click(this.country);
    I.click(this.region_Dropdown);
    I.click(this.region_state);
    I.click(this.continueButton);
    I.click(this.existAddressDropdown);
    I.click(this.existAddress);
    I.click(this.continueButton1);
  }
}
