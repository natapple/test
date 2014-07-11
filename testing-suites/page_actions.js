var PageActions = function() {

    var goToPageAction = function(casper, test, page, start, callback) {
        if(start) {
            casper.start(page, function() {
                if(callback) {
                    callback();
                }
            });
        } else {
            casper.thenOpen(page, function() {
                if(callback) {
                    callback();
                }
            });
        }
    }

    var goToHomepageAction = function(casper, test, start, callback) {
        goToPageAction(casper, test, env.server_url, start, callback);
    }

    var goToDirectoryAction = function(casper, test, start, callback) {
        goToPageAction(casper, test, env.server_url + env.directory_page, start, callback);
    }

    var goToLoginAction = function(casper, test, start, callback) {
        goToPageAction(casper, test, env.server_url + env.login_page, start, callback);
    }

    var goToSignupAction = function(casper, test, start, callback) {
        goToPageAction(casper, test, env.server_url + env.signup_page, start, callback);
    }

    var goToFeaturedAction = function(casper, test, start, callback) {
        goToPageAction(casper, test, env.server_url+ env.featured_page, start, callback);
    }

    var goToAlltapesAction = function(casper, test, start, callback, page) {
        goToPageAction(casper, test, env.server_url+ env.all_page + (page ? 'most-recent/' + page : ''), start, callback);
    }

    var goToExploreAction = function(casper, test, start, callback) {
        goToPageAction(casper, test, env.server_url+ env.explore_page, start, callback);
    }

    var goToUserAction = function(casper, test, start, callback) {
        goToPageAction(casper, test, env.server_url+ env.user_page, start, callback);
    }

    return {
        goToPageAction : goToPageAction,
        goToHomepageAction : goToHomepageAction,
        goToDirectoryAction : goToDirectoryAction,
        goToLoginAction : goToLoginAction,
        goToSignupAction : goToSignupAction,
        goToFeaturedAction : goToFeaturedAction,
        goToAlltapesAction : goToAlltapesAction,
        goToExploreAction : goToExploreAction,
        goToUserAction : goToUserAction
    }
}

module.exports = PageActions;


