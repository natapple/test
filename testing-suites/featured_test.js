var FeaturedTest = function(assert) {

    var moduleName = 'featured_test';
    var testResult = true;

    var testSeries = function(casper, test, start) {

        var last_page = null;
        function getLastPage() {
            var arr = document.querySelectorAll('#pagination li a');
            return Array.prototype.map.call(arr, function(elem) {
                return elem.innerHTML;
            });
        }

        casper.on('failure', function() {
            testResult = false;
        });

        page_actions.goToFeaturedAction(casper, test, start);

        casper.then(function() {
            if(assert) test.assertEquals(this.getTitle().trim(), 'tape.ly / Directory - tapes tagged featured');
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

        casper.then(function() {
            casper.wait(5000);
            var arr = this.evaluate(getLastPage);
            last_page = arr[arr.length - 2];
        });

        casper.then(function() {
            for(var k = 0 ; k < 2; k++) {
                casper.then(function() {
                    var pages = Math.min(env.X_pages, last_page);
                    for(var j = 2 ; j <= pages + 1; j++) {
                        (function(i) {
                            casper.then(function() {
                                this.click('.go-to-page.next');
                            });
                            casper.then(function() {
                                casper.wait(5000);
                            });
                            casper.then(function() {
                                if(assert) test.assertElementCount(".single_work", 12, "Found 12 tapes on featured directory page " + i);
                            });
                            casper.then(function() {
                                if(assert) test.assertSelectorHasText('.page_active', '' + i);
                            });
                        }(j));
                    }
                    casper.then(function() {
                        this.click('#pagelink_1');
                    });

                    casper.then(function() {
                        casper.wait(5000);
                    });
                });
            }
        });

        casper.then(function() {
            this.click('#pagelink_' + last_page);
        });

        casper.then(function() {
            casper.wait(5000);
        });

        casper.then(function() {
            var pages = Math.min(env.X_pages, last_page);
            for(var k = 0 ; k < 2; k++) {
                casper.then(function() {
                    for(var j = parseInt(last_page) - 1; j >= last_page - pages; j--) {
                        (function(i) {
                            casper.then(function() {
                                this.click('.go-to-page.prev');
                            });
                            casper.then(function() {
                                casper.wait(5000);
                            });
                            casper.then(function() {
                                if(assert) test.assertElementCount(".single_work", 12, "Found 12 tapes on featured directory page " + i);
                            });
                            casper.then(function() {
                                if(assert) test.assertSelectorHasText('.page_active', '' + i);
                            });
                        }(j));
                    }
                    casper.then(function() {
                        this.click('#pagelink_' + last_page);
                    });

                    casper.then(function() {
                        casper.wait(5000);
                    });
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

module.exports = FeaturedTest;
