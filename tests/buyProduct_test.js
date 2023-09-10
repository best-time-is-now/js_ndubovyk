const FileReader = require('../helpers/fileReader.js');

const PATH = './productIds.txt';
const fileAsString = FileReader.readFile(PATH);
let productIds = FileReader.convertStringToArray(fileAsString);

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

Before(({ I }) => {
    I.login(USER);
});

Data([FileReader.getRandomElement2Array(productIds)]).Scenario('buy product', async ({ I, productPage, cartPage, current }) => {
    I.amOnPage('/index.php?route=product/product&product_id=' + current);
    await I.emptyCart();
    await productPage.selectColor();
    await productPage.selectSize();
    const productPrice = await productPage.getProductPrice();
    console.log("Price before taxes is " + productPrice);
    productPage.proceedToCheckout();
    const isAccessible = await I.clickCheckoutButton();
    if (isAccessible) {
        await cartPage.fillCheckoutForm(USER);
        const tax = await cartPage.getTax();
        const totalPrice = await cartPage.getTotalPrice();
        I.assertEqual(productPrice + tax, totalPrice, "Prices are not equal");
        cartPage.clickConfirmOrder();
        cartPage.verifySuccessfulPurchase();
    }

}).tag("buy");

