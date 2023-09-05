const USER = {
    email: "114@test.com",
    password: "12345",
    firstName: "Angelina",
    lastName: "New",
    address: "117",
    city: "New York",
    postcode: "123",
    country: "United States",
    region_state: "New York",
}

Feature('buy product');

Scenario('buy product', async ({ I, productPage, cartPage }) => {
    I.login(USER);
    I.amOnPage('/index.php?route=product/product&product_id=44');
    await I.emptyCart();
    productPage.selectColor();
    productPage.selectSize();
    I.proceedToCheckout();
    I.clickCheckoutButton();
    cartPage.fillCheckoutForm(USER);
    const productPrice = await productPage.getProductPrice();
    console.log("Price before taxes is " + productPrice);
    const tax = await cartPage.getTax();
    const totalPrice = await cartPage.getTotalprice();
    I.assertEqual(productPrice + tax, totalPrice, "Prices are not equal");
    cartPage.verifySuccessfulPurchase();

}).tag("buy");
