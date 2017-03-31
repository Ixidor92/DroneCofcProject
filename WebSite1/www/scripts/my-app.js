// Initialize your app
var myApp = new Framework7({
    template7Pages: true // enable Template7 rendering for Ajax and Dynamic pages
});
// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
});

// Generate dynamic page
var dynamicPageIndex = 0;