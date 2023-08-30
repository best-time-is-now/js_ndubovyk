const NEW_USER = {
    firstName: "Angelina",
    lastName: "22",
    email: Date.now() + '@test.com',
    phone: "1234567",
    password: "1234567890",
    confirmPassword: "1234567890",
}

Feature('register');

Scenario('register new user', ({ I, basePage, accountPage }) => {
    I.amOnPage('http://opencart.qatestlab.net/');
    basePage.clickMyAccount();
    basePage.clickRegister();
    accountPage.verifyRegisterAccountPage();
    accountPage.fillNewUserForm(NEW_USER);
    accountPage.clickPrivacyConfirmation();
    accountPage.clickContinue();
    accountPage.verifySuccesfulRegistration();
});