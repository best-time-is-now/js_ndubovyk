
const emailField = { css: "#input-email" };
const passwordField = { css: "#input-password" };
const signInButton = { xpath: '//a[text()="Sign In"]' };
const loginButton = { xpath: '//input[@type="submit"]' };
const myOrdersText = { xpath: '//h2[text()="My Orders"]' };
const addToCartButton = { xpath: '//button[@type="button"][@id="button-cart"]' };
const cartIcon = { xpath: '//i[@class="linearicons-cart"]' };
const checkoutButton = { xpath: '//a[@class="btn-primary btn-r"][1]' };
const clearCartButton = { xpath: '(//i[@class="linearicons-trash"])[last()]' };
const notAvailableProduct = { xpath: '//*[@id="content"]/form/div/table/tbody/tr[1]/td[2]/span' };

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
      const numOfElements = await this.grabNumberOfVisibleElements(clearCartButton);

      if (numOfElements > 0) {
        for (let i = 0; i < numOfElements; i++) {
          this.click(clearCartButton);
        }
      }
    },

    proceedToCheckout() {
      this.click(addToCartButton);
      this.click(cartIcon);
    },

    async clickCheckoutButton() {
      try {
        const productIsVisible = await this.checkElementExists(notAvailableProduct);

        if (!productIsVisible) {
          throw new Error('Sorry, the product is not available');
        } else {
          this.click(checkoutButton);
          return true;
        }
      } catch (e) {
        console.log('Please, choose the available product');
        return false;
      }
    },
  });
}
