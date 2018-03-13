const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');
const Video = require('../../models/video');

describe('Model: video', () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  describe('Title', () => {
    it('is a String', () => {
      const titleAsNonString = 1;
      const video = new Video({title: titleAsNonString});
      assert.strictEqual(video.title, titleAsNonString.toString());
    });
    it('is required', () => {
      const video = new Video({});
      video.validateSync();
      assert.equal(video.errors.title.message, 'Path `title` is required.');
    });
  });
  describe('Description', () => {
    it('is a String', () => {
      const asNonString = 1;
      const video = new Video({description: asNonString});
      assert.strictEqual(video.description, asNonString.toString());
    });
    it('is required', () => {
      const video = new Video({});
      video.validateSync();
      assert.equal(video.errors.description.message, 'Path `description` is required.');
    });
  });
});
