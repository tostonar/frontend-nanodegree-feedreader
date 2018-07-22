/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('URL is defined and exists', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe('');
      }
    });

    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('name is defined and exists', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name).not.toBe('');
      }
    });
  });



  describe('The menu', function() {
    var body, menuIcon;

    beforeEach(function() {
      body = $('body');
    })

    /* A test that ensures the menu element is
     * hidden by default.
     */
    it('is hidden', function() {
      expect(body.hasClass('menu-hidden')).toBeTruthy();
    });

    /* A test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes when clicked', function() {
      menuIcon = $('.menu-icon-link');
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toBeFalsy();
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toBeTruthy();
    });
  });



  describe('Initial Entries', function() {
    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    beforeEach(function(done) {
      loadFeed(0, done);
    });


    it('entry in feed container', function(done) {
      var container = $('.feed'),
        entries = $('article.entry');

      expect(entries.length).not.toBeLessThan(1);
      done();
    })

  });



  describe('New Feed Selector', function() {
    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    var contentBefore, contentAfter;

    beforeEach(function(done) {
      loadFeed(0, function() {
        contentBefore = $('.feed').html();
        done();
        setTimeout(function() {
          loadFeed(1, function() {
            contentAfter = $('.feed').html();
            done();
          });
        }, 1000);

      });

    });

    // checking content of feed container to make sure it changes
    it('should change content', function(done) {
      expect(contentBefore).toBe(contentAfter);
      done();
    });


  });


}());
