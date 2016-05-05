app.config(function($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('/', {
      url: "/",
      views: {
        "homeView": { templateUrl: "/layouts/home/index.html" }
      }
    })
    .state('login', {
      url: "/login",
      views: {
        "homeView": { templateUrl: "/layouts/home/login.html" }
      }
    })
    .state('register', {
      url: "/register",
      views: {
        "homeView": { templateUrl: "/layouts/home/register.html" }
      }
    })
    .state('category', {
      url: "/category/:id",
      views: {
        "homeView": { templateUrl: "/layouts/home/index.html" }
      }
    })
    .state('tag', {
      url: "/tag/:id",
      views: {
        "homeView": { templateUrl: "/layouts/home/index.html" }
      }
    })
    // .state('admin', {
    //   url: "/admin",
    //   views: {
    //     "mainView": { templateUrl: "/layouts/admin/dashboard.html" }
    //   }
    // })

});