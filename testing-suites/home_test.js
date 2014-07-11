var HomeTest = function(assert) {

    var moduleName = 'home_test';
    var testResult = true;

    var testSeries = function(casper, test, start) {

        casper.on('failure', function() {
            testResult = false;
        });

        page_actions.goToHomepageAction(casper, test, start);

        casper.then(function() {
            if(assert) test.assertEquals(this.getTitle().trim(), 'Create and share online mixtapes on tape.ly');
        });

        casper.then(function() {
            var mixtapeCount = this.evaluate(function() {
                var tapes = $('.single_work');
                return tapes.length;
            });
            if(assert){
                test.assert(mixtapeCount >= 8 && mixtapeCount <= 9, "Found " + mixtapeCount + " tapes home page");
            }
        });

        casper.then(function() {
            if(assert) test.assertExists(".mix_day", "Mix of the day exists on page");
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

module.exports = HomeTest;
