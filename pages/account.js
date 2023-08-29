const { I } = inject();

module.exports = {
    h1: { xpath: '//*[@id="content"]/h1' },
    firstNameField: {xpath: '//*[@id="input-firstname"]'},
    lastNameField: {xpath: '//*[@id="input-lastname"]'},
    email: {xpath: '//*[@id="input-email"]'},

    verifyRegisterAccountPage() {
      const regTitleText = 'Register Account';
      I.seeTextEquals(regTitleText, this.h1);
    },

    fillNewUserForm(user) {
      I.fillField(this.firstNameField, user.firstName);
      I.fillField(this.lastNameField, user.lastName);
      I.fillField(this.email, user.email);
    }

  // insert your locators and methods here
}
