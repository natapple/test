var AlltapesTest = function(assert) {

    var moduleName = 'alltapes_test';
    var testResult = true;

    var testSeries = function(casper, test, start) {

        casper.on('failure', function() {
            testResult = false;
        });

        page_actions.goToAlltapesAction(casper, test, start);

        casper.then(function() {
            if(assert) test.assertElementCount(".single_work", 12, "Found 12 tapes on first directory page");
        });

        casper.then(function() {
            if(assert) test.assertExists("#pagination", "Pagination exists on page");
        });

        casper.then(function() {
            if(assert) test.assertExists("#tagslayer", "Tags wrapper exists on page");
        });

        casper.then(function() {
            if(assert) test.assertExists(".showmore_tags", "Show more tags exists on page");
        });

        casper.then(function() {
            if(assert) test.assertNotVisible('#tag_showless', 'Show less tags is not visible');
        });

        casper.then(function() {
            this.click('.showmore_tags');
        });

        casper.then(function() {
            if(assert) test.assertVisible('#tag_showless', 'Show less tags is visible');
        });

        casper.then(function() {
            this.click('.showless_tags');
        });

        casper.then(function() {
            if(assert) test.assertNotVisible('#tag_showless', 'Show less tags is not visible');
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

module.exports = AlltapesTest;
