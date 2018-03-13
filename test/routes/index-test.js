// const {assert} = require('chai');
// const request = require('supertest');
//
// const app = require('../../app');
//
// const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');
// const {parseTextFromHTML, buildVideoObject, seedVideoToDatabase} = require('../test-utils');
//
// const Video = require('../../models/video');
//
// describe('Server path: /', async () => {
//
//   beforeEach(connectDatabaseAndDropData);
//   afterEach(disconnectDatabase);
//
//   describe('GET', async () => {
//     it('renders existing videos', async () => {
//       // setup
//       const video = await seedVideoToDatabase();
//
//       // Exercise
//       const response = await request(app)
//         .get(`/videos`);
//
//       // Verify
//       assert.include(parseTextFromHTML(response.text, `#videos-container`), video.title);
//     });
//   });
// });
