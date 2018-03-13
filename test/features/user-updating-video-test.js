const { assert } = require("chai");
const {buildVideoObject} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe("User visits the edit video page", () => {
    const { title, description, url }= buildVideoObject();

    beforeEach(() => {
        connectDatabaseAndDropData();
        browser.url("/videos/create");

        browser.setValue("#title-input", title);
        browser.setValue("#description-input", description);
        browser.setValue("#url-input", url);
        browser.click("#submit-button");

        browser.click("#edit");
    });

    afterEach(disconnectDatabase);

    it("renders a video for edition", () => {
        assert.equal(browser.getAttribute("#title-input", "value"), title);
        assert.equal(browser.getText("#description-input"), description);
        assert.equal(browser.getAttribute("#url-input", "value"), url);
    });

    it("shows the updated title on the video page after editing it", () => {
        const newTitle = "Updated Title";

        browser.setValue("#title-input", newTitle);
        browser.click("#submit-button");

        assert.include(browser.getText(".video-title"), newTitle);
    });

    it("does not create an additional video after updating a video", () => {
        const newTitle = "Brand new title";

        browser.setValue("#title-input", newTitle);
        browser.click("#submit-button");

        browser.url('/videos');

        assert.notInclude(browser.getText("body"), title);
    });

});
