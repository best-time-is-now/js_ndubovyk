const { I } = inject();

module.exports = {
  colorDropDown: { xpath: '//label[text()="Color"]/following-sibling::div/a[1]' },
  sizeDropDown: { xpath: '//label[text()="Size"]/following-sibling::div/a[1]' },
  colorOption: { xpath: '//label[text()="Color"]/following-sibling::div/ul/li[2]' },
  sizeOption: { xpath: '//label[text()="Size"]/following-sibling::div/ul/li[2]' },

  selectColor() {
    I.click(this.colorDropDown);
    I.click(this.colorOption);
  },

  selectSize() {
    I.click(this.sizeDropDown);
    I.click(this.sizeOption);
  }
}
