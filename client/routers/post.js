app.config(function($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('post-detail', {
      url: "/post/:id",
      views: {
        "homeView": { templateUrl: "/layouts/home/post-detail.html" }
      }
    })
});