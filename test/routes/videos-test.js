const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');
const {parseTextFromHTML, buildVideoObject, seedVideoToDatabase} = require('../test-utils');

const Video = require('../../models/video');

describe('Server path: /videos - hello', async () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  describe('GET', async () => {
    it('renders existing videos', async () => {
      // setup
      const video = await seedVideoToDatabase();

      // Exercise
      const response = await request(app)
        .get(`/videos`);

      // Verify
      assert.include(parseTextFromHTML(response.text, `#videos-container`), video.title);
    });
  });
  describe('POST', async () => {
    it('when the title is missing does not save the Video', async () => {
      // setup
      const video = {
        description: 'hello',
        url: 'http://www.goodbye.com',
      };
      //exercise
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(video);
      //validate
      const videos = await Video.find({});

      assert.equal(videos.length, 0);
    });

    it('when the title is missing return status 400', async () => {
      // setup
      const video = {
        description: 'hello',
        url: 'http://www.goodbye.com',
      };
      //exercise
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(video);
      //validate
      assert.equal(response.status, 400);
    });

    it('when the title is missing description still entered', async () => {
      // setup
      const video = {
        description: 'hello',
        url: 'http://www.goodbye.com',
      };
      //exercise
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(video);
      //validate
      assert.include(parseTextFromHTML(response.text, "#description-input"), video.description);
    });
  });
});
