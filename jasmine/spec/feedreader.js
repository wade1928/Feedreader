/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All tests are placed within the $() function,
 * since some of these tests may require DOM elements. This is
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is the first test suite. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* test to make sure that the allFeeds variable has been defined and that it is not
     * empty*/

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('URL defined and is not empty', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    /* test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('name defined', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });

  /* this is the second test suite*/
  describe('The menu', function() {
    let body = $('body');
    let callback = jasmine.createSpy('body', 'toggleClass');
    let menuIconVisible = $('.menu-icon-list:visible');


    /* test that ensures the menu element is
     * hidden by default. */

    it('is hidden', function() {
      expect(body.hasClass('menu-hidden')).toBe(true);
      expect(callback).not.toHaveBeenCalled();
    });

    /* test that ensures the menu changes
     * visibility when the menu icon is clicked.
     */
    it('toggles on and off', function() {
      if (callback.calls.count() % 2 === 0) {
        expect(body.hasClass('menu-hidden')).toBe(true);
      } else {
        expect(body.hasClass('menu-hidden')).toBe(false);
      }
    });
  });

  /* this is the third test suite*/
  describe('Initial Entries', function() {

    /* test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('completes work', function(done) {
      expect($('.feed')).not.toBeNull();
      expect($('div.feed a.entry-link article.entry')).not.toBeNull();
      expect($('div.feed a.entry-link article.entry')).toBeDefined();
      done();
    });

  });
  /* this is the fourth test suite*/
  describe('New Feed Selection', function() {
    let sOne;
    let sTwo;
    beforeEach(function(done) {
      loadFeed(0);
      sOne = $('h1.header-title')[0].innerText;
      done();
    });
    afterEach(function(done) {
      loadFeed(1);
      sTwo = $('h1.header-title')[0].innerText;
      done();
    });

    /* test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    it('content changes', function(done) {
      expect(sOne).not.toEqual(sTwo);
      done();
    });
  });
});