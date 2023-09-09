
emailField = { css: "#input-email" };
passwordField = { css: "#input-password" };
signInButton = { xpath: '//a[text()="Sign In"]' };
loginButton = { xpath: '//input[@type="submit"]' };
myOrdersText = { xpath: '//h2[text()="My Orders"]' };
addToCartButton = { xpath: '//button[@type="button"][@id="button-cart"]' };
cartIcon = { xpath: '//i[@class="linearicons-cart"]' };
checkoutButton = { xpath: '//a[@class="btn-primary btn-r"][1]' };
notAvailableProduct = { xpath: '//*[@id="content"]/form/div/table/tbody/tr[1]/td[2]/span' };

module.exports = function () {
  return actor({

    async checkElementExists(element) {
      return Boolean(await this.grabNumberOfVisibleElements(element));
    },

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
      const numOfElements = await this.grabNumberOfVisibleElements('//li[@class="product"]');

      if (numOfElements > 0) {
        for (let i = 1; i < numOfElements * 2; i++) {
          this.click('(//i[@class="linearicons-trash"])[last()]');
        }
      }
    },

    proceedToCheckout() {
      this.click(addToCartButton);
      this.click(cartIcon);
    },

    async clickCheckoutButton() {
      try {
        this.click(checkoutButton);

        const productIsVisible = await this.checkElementExists(this.notAvailableProduct);

        if (!productIsVisible) {
          throw new Error('Sorry, the product is not available');
        }
      } catch (e) {
        console.log('Please, choose the available product');
      }
    },
  });
}
