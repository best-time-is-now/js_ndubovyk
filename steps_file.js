emailField = { css: "#input-email" };
passwordField = { css: "#input-password" };
signInButton = { xpath: '//a[text()="Sign In"]' };
loginButton = { xpath: '//input[@type="submit"]' };
myOrdersText = { xpath: '//h2[text()="My Orders"]' };
addToCartButton = { xpath: '//button[@type="button"][@id="button-cart"]' };
cartIcon = { xpath: '//i[@class="linearicons-cart"]' };
checkoutButton = { xpath: '//a[@class="btn-primary btn-r"]' };

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
        this.click(checkoutButton);
    },
  });
}
