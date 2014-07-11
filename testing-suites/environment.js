var Environment = function() {

     var registerModule = function(mod) {
         modules[mod.moduleName] = mod;
     }

    return {
        registerModule: registerModule,
        'server_url' : 'http://localhost:3000/',
        'username' : 'chris@tape.ly',
        'password' : '123456',
        'login_page' : 'login/',
        'signup_page' : 'register/',
        'directory_page' : 'directory/',
        'featured_page' : 'explore/featured',
        'all_page' : 'directory/most-recent/1',
        'explore_page' : 'explore/alternative/most-recent/1',
        'user_page' : 'users/cvrsor',
        'X_pages' : 3
    }
}

module.exports = Environment;
