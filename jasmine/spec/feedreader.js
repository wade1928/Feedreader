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
		it('URL defined', function() {
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



		/* test that ensures the menu element is
		 * hidden by default. */


		it('is hidden', function() {
			const body = document.querySelector('body');
			expect(body.classList.contains('menu-hidden')).toBe(true);
		});

		/* test that ensures the menu changes
		 * visibility when the menu icon is clicked. 
		 */
		it('toggles on and off', function() {
			const body = document.querySelector('body');
			const menu = document.querySelector('.menu-icon-link');

			menu.click();
			expect(body.classList.contains('menu-hidden')).toBe(false);

			if ((body.classList.contains('menu-hidden'))) {
				menu.click();
				expect(body.classList.contains('menu-hidden')).toBe(true);
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

		it('completes work', function() {
			const feed = document.querySelector('.feed');
			expect(feed.children.length > 0).toBe(true);
		});

	});
	/* this is the fourth test suite*/
	describe('New Feed Selection', function() {
		const feed = document.querySelector('.feed');
		const firstFeed = [];

		beforeEach(function(done) {
			loadFeed(0);
			Array.from(feed.children).forEach(function(entry) {
				firstFeed.push(entry.innerText);
			});
			loadFeed(1, done);
		});

		/* test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		it('content changes', function() {
			Array.from(feed.children).forEach(function(entry, index) {
				console.log(entry.innerText, firstFeed[index], entry.innerText === firstFeed[index]);
				expect(entry.innerText === firstFeed[index]).toBe(false);
			});
		});
	});
}());