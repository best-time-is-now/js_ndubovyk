const FileReader = require('../helpers/fileReader.js');

const PATH = './productIds.txt';
const productIds = FileReader.readFile(PATH);

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

let productLinks = [44, 48, 68, 45, 32];

Feature('buy product');

Before(({ I }) => {
    I.login(USER);
});

Data(productLinks).Scenario('buy product', async ({ I, productPage, cartPage, current }) => {
    console.log(FileReader.convertStringToArray(productIds));
    I.amOnPage('/index.php?route=product/product&product_id=' + current);
    console.log(await productPage.selectColor());
    console.log(await productPage.selectSize());

    await I.emptyCart();
    await productPage.selectColor();
    await productPage.selectSize();
    const productPrice = await productPage.getProductPrice();
    console.log("Price before taxes is " + productPrice);
    I.proceedToCheckout();
    await I.clickCheckoutButton();
    await cartPage.fillCheckoutForm(USER);
    const tax = await cartPage.getTax();
    const totalPrice = await cartPage.getTotalPrice();
    I.assertEqual(productPrice + tax, totalPrice, "Prices are not equal");
    cartPage.clickConfirmOrder();
    cartPage.verifySuccessfulPurchase();

}).tag("buy");
