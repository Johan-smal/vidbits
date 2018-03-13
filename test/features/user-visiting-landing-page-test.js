const {assert} = require('chai');

describe('User visiting landing page', () => {
  describe('with no existing videos', () => {
    it('shows no videos', () => {
      browser.url('/videos');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('can navigate to video create page', () => {
    it('renders create page', () => {
      // Setup
      browser.url('/videos');
      // Exercise
      browser.click('a[href="/videos/create"]');
      // Verify
      assert.include(browser.getText('body'), 'Save a video');
    });
  });
});
