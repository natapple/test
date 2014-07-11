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

        casper.then(function() {
            var follows = this.evaluate(function() {
                var providers = $('.followuser');
                return providers.length;
            });

            if(follows == 1) {
                casper.then(function() {
                    if(assert) test.assertExists(".followuser", "Follow user exists");
                });

                casper.then(function() {
                    this.click('.followuser');
                });

                casper.then(function() {
                    casper.wait(5000);
                });

                casper.then(function() {
                    if(assert) test.assertExists(".unfollowuser", "Unfollow user exists");
                });

                casper.then(function() {
                    this.click('.unfollowuser');
                });
            } else {
                casper.then(function() {
                    if(assert) test.assertExists(".unfollowuser", "Unfollow user exists");
                });

                casper.then(function() {
                    this.click('.unfollowuser');
                });

                casper.then(function() {
                    casper.wait(5000);
                });

                casper.then(function() {
                    if(assert) test.assertExists(".followuser", "Follow user exists");
                });

                casper.then(function() {
                    this.click('.followuser');
                });
            }
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
