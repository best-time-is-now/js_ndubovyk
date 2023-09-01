const USER = {
    email: "117@test.com",
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

Scenario('buy product', ({ I, productPage }) => {
    I.login(USER);
    I.amOnPage('/index.php?route=product/product&product_id=44');
    productPage.selectColor();
    productPage.selectSize();
    I.proceedToCheckout();
    I.clickCheckoutButton();
    I.fillCheckoutForm(USER);
}).tag("buy");
