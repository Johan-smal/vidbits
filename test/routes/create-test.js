const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');

const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');
const {parseTextFromHTML, buildVideoObject, seedVideoToDatabase} = require('../test-utils');

const Video = require('../../models/video');

describe('Server path: /videos/create', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('POST', () => {

    // it('return 201 status', async () => {
    //   // setup
    //   const video = buildVideoObject();
    //
    //   // exercise
    //   const response = await request(app)
    //     .post('/videos')
    //     .type('form')
    //     .send(video);
    //
    //   // validate
    //   assert.equal(response.status, 201);
    // });

    it('succesfully add video to database', async () => {
      it('succesfully posts video to database', async () => {
        // setup
        const title = 'Little Bits!';
        const description = 'This is the best video ever!!!!!!111';
        const url = 'https://www.youtube.com/watch?v=WKYD-cDd_Gs';

        // exercise
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send({title, description, url});

        const foundVideo = await Video.findOne({});

        // validate
        assert.include(foundVideo.title, title);
        assert.include(foundVideo.description, description);
        assert.include(foundVideo.url, url);
      });
    });
  });
});
