var DirectoryTest = function(assert) {

    var moduleName = 'directory_test';
    var testResult = true;

    var testSeries = function(casper, test, start) {

        function getTags() {
            var arr = document.querySelectorAll('#tagslayer .panel ul div');
            return Array.prototype.map.call(arr, function(elem) {
                return elem.innerHTML;
            });
        }

        casper.on('failure', function() {
            testResult = false;
        });

        page_actions.goToDirectoryAction(casper, test, start);

        casper.then(function() {
            if(assert) test.assertEquals(this.getTitle().trim(), 'tape.ly / Directory');
        });

        casper.then(function() {
            if(assert) test.assertExists("#home_link", "Home link exists on page");
        });

        casper.then(function() {
            if(assert) test.assertExists("#directory_link", "Directory link exists on page");
        });

        casper.then(function() {
            if(assert) test.assertExists("#blog_link", "Blog link exists on page");
        });

        casper.then(function() {
            if(assert) test.assertExists("#login_link", "Login link exists on page");
        });

        casper.then(function() {
            if(assert) test.assertExists("#signup_link", "Signup link exists on page");
        });

        casper.then(function() {
            if(assert) test.assertExists(".one_third.twitter", "Twitter exists on page");
        });

        casper.then(function() {
            if(assert) test.assertExists(".one_third.facebook", "Facebook exists on page");
        });

        casper.then(function() {
            if(assert) test.assertExists(".one_third.contact", "Contact form exists on page");
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
            var arr = this.evaluate(getTags);
            if(assert) test.assert(arr.length > 60, 'More than 60 tags');

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
            casper.wait(100);
        });

        casper.then(function() {
            if(assert) test.assertVisible('#tag_showless', 'Show less tags is visible');
        });

        casper.then(function() {
            this.click('.showless_tags');
        });

        casper.then(function() {
            casper.wait(100);
        });

        casper.then(function() {
            if(assert) test.assertNotVisible('#tag_showless', 'Show less tags is not visible');
        });

        casper.then(function() {
            this.click('#blog_link a');
        });

        casper.then(function() {
            if(assert) test.assertEquals(this.getTitle().trim(), 'tape.ly blog - tape.ly is a fresh music platform that allows music lovers to create gorgeous-looking, personal mixtapes and share them with friends.',  "Blog opened correctly");
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
