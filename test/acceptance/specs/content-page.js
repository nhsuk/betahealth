const ContentPage = require('../pageobjects/content-page.page');

describe('a content page', () => {
  it('should contain a local header', () => {
    ContentPage.open();
    ContentPage.header.isVisible().should.be.true;
  });

  it('should contain a heading level 1', () => {
    ContentPage.open();
    ContentPage.h1.isVisible().should.be.true;
  });

  it('<title> should start with the heading level 1', () => {
    ContentPage.open();

    const heading1 = ContentPage.h1.getText();
    const title = ContentPage.getTitle();

    title.should.startWith(heading1);
  });
});
