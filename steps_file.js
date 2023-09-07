emailField = { css: "#input-email" };
passwordField = { css: "#input-password" };
signInButton = { xpath: '//a[text()="Sign In"]' };
loginButton = { xpath: '//input[@type="submit"]' };
myOrdersText = { xpath: '//h2[text()="My Orders"]' };
addToCartButton = { xpath: '//button[@type="button"][@id="button-cart"]' };
cartIcon = { xpath: '//i[@class="linearicons-cart"]' };
checkoutButton = { xpath: '//a[@class="btn-primary btn-r"]' };
clearCartButton = { xpath: '//*[@class="linearicons-trash"]' };

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

    async emptyCart() {
      this.click(cartIcon);
      const numOfElements = await this.grabNumberOfVisibleElements('//i[@class="linearicons-trash"]');

      if (numOfElements > 0) {
        for (let i = 1; i < numOfElements; i++) {
          this.click('(//div[@class="buttons"]/button[@class="link"])[' + i + ']');
        }
      }
    },

    proceedToCheckout() {
      this.click(addToCartButton);
      this.click(cartIcon);
    },

    clickCheckoutButton() {
      this.click(checkoutButton);
    },
  });
}
