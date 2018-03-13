const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');
const {parseTextFromHTML, buildVideoObject, seedVideoToDatabase} = require('../test-utils');

describe('Server path: /videos/:id', async () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  describe('GET', async () => {
    it('renders the single video page', async () => {
      // setup
      const video = await seedVideoToDatabase();
      const videoId = video._id;

      // Exercise
      const response = await request(app)
        .get(`/videos/${videoId}`);


      assert.equal(parseTextFromHTML(response.text, ".video-card"), video.title);
      assert.equal(parseTextFromHTML(response.text, "iframe"), "");
      assert.equal(parseTextFromHTML(response.text, ".video-card"), video.description);
    });
  });
});
