import { SixthRepPage } from './app.po';

describe('sixth-rep App', function() {
  let page: SixthRepPage;

  beforeEach(() => {
    page = new SixthRepPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
