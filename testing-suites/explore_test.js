var ExploreTest = function(assert) {

    var moduleName = 'explore_test';
    var testResult = true;

    var testSeries = function(casper, test, start) {

        casper.on('failure', function() {
            testResult = false;
        });

        page_actions.goToExploreAction(casper, test, start);

        casper.then(function() {
            if(assert) test.assertEquals(this.getTitle().trim(), 'tape.ly / Directory - tapes tagged alternative');
        });

        casper.then(function() {
            if(assert) test.assertElementCount(".single_work", 12, "Found 12 tapes on featured directory page");
        });

        casper.then(function() {
            if(assert) test.assertExists("#pagination", "Pagination exists on page");
        });

        casper.then(function() {
            if(assert) test.assertDoesntExist(".showmore_tags", "Show more tags does not exist on page");
        });

        casper.run(function() {
            test.done();
        });
    }

    var dependencies = [];

    return {
        testSeries : testSeries,
        moduleName : moduleName,
        testResult: testResult,
        dependencies: dependencies
    }
}

module.exports = ExploreTest;
