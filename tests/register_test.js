const NEW_USER = {
    firstName: "Alex",
    lastName: "22",
    email: Date.now() + '@test.com',
}

Feature('register');

xScenario('click, fill, see', ({ I, basePage }) => {
    I.amOnPage('http://opencart.qatestlab.net/');
    basePage.clickMyAccount();
    basePage.clickRegister();
    I.fillField({xpath: '//*[@id="input-firstname"]'}, "User");
    const regTitleText = 'Register Account';
    I.seeTextEquals(regTitleText, {xpath: '//*[@id="content"]/h1'});
    //I.see(regTitleText);
});
 
xScenario('grab', async ({ I }) => {
    I.amOnPage('http://opencart.qatestlab.net/index.php?route=product/product&path=20&product_id=29');
    const price = await I.grabTextFrom({xpath: '//*[@id="content"]/div[1]/div[2]/div/div[1]/span[1]'});
    console.log('Price is ' + price);
});

Scenario('register new user', ({ I, basePage, accountPage }) => {
    I.amOnPage('http://opencart.qatestlab.net/');
    basePage.clickMyAccount();
    basePage.clickRegister();
    accountPage.verifyRegisterAccountPage();
    accountPage.fillNewUserForm(NEW_USER);
    pause();
});
 
