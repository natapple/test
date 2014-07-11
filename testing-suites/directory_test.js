var DirectoryTest = function(assert) {

    var moduleName = 'directory_test';
    var testResult = true;

    var testSeries = function(casper, test, start) {

        casper.on('failure', function() {
            testResult = false;
        });

        page_actions.goToDirectoryAction(casper, test, start);

        casper.then(function() {
            if(assert) test.assertEquals(this.getTitle().trim(), 'tape.ly / Directory');
        });

        casper.then(function() {
            this.click('.go-to-index');
        });

        casper.then(function() {
           casper.wait(5000);
        });

        casper.then(function() {
            if(assert) test.assertExists(".mix_day", "Mix of the day exists on page");
        });

        casper.then(function() {
            this.click('.go-to-directory');
        });

        casper.then(function() {
            casper.wait(5000);
        });

        casper.then(function() {
            if(assert) test.assertElementCount(".single_work", 12, "Found 12 tapes on general directory page");
        });

        casper.then(function() {
            if(assert) test.assertExists("#tagslayer", "Tags wrapper exists on page");
        });

        casper.then(function() {
            if(assert) test.assertElementCount(".more-button", 2, "Found 2 'more' buttons on page");
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

module.exports = DirectoryTest;
