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

Before(async ({ I }) => {
    I.login(USER);
    await I.emptyCart();
});

Data([FileReader.getRandomElementFromArray(productIds)]).Scenario('buy product', async ({ I, productPage, cartPage, current }) => {
    I.amOnPage('/index.php?route=product/product&product_id=' + current);
    await productPage.selectColor();
    await productPage.selectSize();
    const productPrice = await productPage.getProductPrice();
    console.log("Price before taxes is " + productPrice);
    await productPage.proceedToCheckout();
    await productPage.clickCheckoutButton();
    
    const isNotAccessible = await productPage.checkProductIsNotAvailable();
    if (isNotAccessible) {
        productPage.throwIfNotAvailable(isNotAccessible);
    } else {
        await cartPage.fillCheckoutForm(USER);
        const tax = await cartPage.getTax();
        const totalPrice = await cartPage.getTotalPrice();
        I.assertEqual(productPrice + tax, totalPrice, "Prices are not equal");
        cartPage.clickConfirmOrder();
        cartPage.verifySuccessfulPurchase();
    }
}).tag("buy");