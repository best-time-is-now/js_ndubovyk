emailField = { css: "#input-email" };
passwordField = { css: "#input-password" };
signInButton = { xpath: '//a[text()="Sign In"]' };
loginButton = { xpath: '//input[@type="submit"]' };
myOrdersText = { xpath: '//h2[text()="My Orders"]' };
addToCartButton = { xpath: '//button[@type="button"][@id="button-cart"]' };
cartIcon = { xpath: '//i[@class="linearicons-cart"]' };
checkoutButton = { xpath: '//a[@class="btn-primary btn-r"]' };
firstNameField = { xpath: '//input[@type="text"][@id="input-payment-firstname"]' };
lastNameField = { xpath: '//input[@type="text"][@id="input-payment-lastname"]' };
addressField = { xpath: '//input[@id="input-payment-address-1"]' };
cityField = { xpath: '//*[@id="input-payment-city"]' };
postcodeField = { xpath: '//*[@id="input-payment-postcode"]' };
countryDropdown = { xpath: '//a[@class="sbToggle sbFocus"]' };
country = { xpath: '//li[a[text()="United States"]]' };

module.exports = function () {
  return actor({

    login(user) {
      this.amOnPage('http://opencart.qatestlab.net/');
      this.click(signInButton);
      this.fillField(emailField, user.email);
      this.fillField(passwordField, user.password);
      this.click(loginButton);
      this.seeTextEquals("My Orders", myOrdersText);
    },

    proceedToCheckout() {
      this.click(addToCartButton);
      this.click(cartIcon);
    },

    clickCheckoutButton() {
      for (i = 0; i < 2; i++) {
        this.click(checkoutButton);
      }
    },

    fillCheckoutForm(customer) {
      this.fillField(firstNameField, customer.firstName);
      this.fillField(firstNameField, customer.firstName);
      this.fillField(lastNameField, customer.lastName);
      this.fillField(addressField, customer.address);
      this.fillField(cityField, customer.city);
      this.fillField(postcodeField, customer.postcode);
      this.selectOption(countryDropdown);
      this.click(country);
    },
  });
}
