var UserTest = function(assert) {

    var moduleName = 'user_test';
    var testResult = true;

    var testSeries = function(casper, test, start) {

        casper.on('failure', function() {
            testResult = false;
        });

        page_actions.goToUserAction(casper, test, start);

        casper.then(function() {
            if(assert) test.assertEquals(this.getTitle().trim(), 'tape.ly / Cvrsor');
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

module.exports = UserTest;
