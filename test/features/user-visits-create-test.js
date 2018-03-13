const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visiting create page', () => {
  describe('fills out the form and submits', () => {
    it('the new video is added to the landing page', () => {
      // setup
      const { title, description, url } = buildVideoObject();
      browser.url('/videos/create');

      //exercise
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#submit-button');

      // verify
      assert.include(browser.getText('body'), title);
      assert.include(browser.getText('body'), description);
      assert.include(browser.getText('body'), url);
    });
  });
});
