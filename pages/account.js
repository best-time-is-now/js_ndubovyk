const { I } = inject();

module.exports = {
  regAccountPage_h1: { xpath: '//*[@id="content"]/h1' },
  firstNameField: { xpath: '//*[@id="input-firstname"]' },
  lastNameField: { xpath: '//*[@id="input-lastname"]' },
  email: { xpath: '//*[@id="input-email"]' },
  phone: { xpath: '//*[@id="input-telephone"]' },
  password: { xpath: '//*[@id="input-password"]' },
  confirmPassword: { xpath: '//*[@id="input-confirm"]' },
  successfulRegPage_h1: { xpath: '//*[@id="content"]/h1' },
  privacyPolicyConfirmation: { xpath: '//*[@id="content"]/form/div/div/input[1]' },
  continueButton: { xpath: '//*[@id="content"]/form/div/div/input[2]' },

  verifyRegisterAccountPage() {
    const regTitleText = 'Register Account';
    I.seeTextEquals(regTitleText, this.regAccountPage_h1);
  },

  fillNewUserForm(user) {
    I.fillField(this.firstNameField, user.firstName);
    I.fillField(this.lastNameField, user.lastName);
    I.fillField(this.email, user.email);
    I.fillField(this.phone, user.phone);
    I.fillField(this.password, user.password);
    I.fillField(this.confirmPassword, user.confirmPassword);
  },

  clickPrivacyConfirmation() {
    I.click(this.privacyPolicyConfirmation);
  },

  clickContinue() {
    I.click(this.continueButton);
  },

  verifySuccesfulRegistration() {
    const successfulRegText = 'Your Account Has Been Created!';
    I.seeTextEquals(successfulRegText, this.successfulRegPage_h1);
  },
}