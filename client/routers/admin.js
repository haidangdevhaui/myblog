app.config(function($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('dashboard', {
      url: "/admin/",
      views: {
        "adminView": { templateUrl: "/layouts/admin/dashboard.html" }
      }
    })
    .state('admin-post-create', {
      url: "/admin/post/create",
      views: {
        "adminView": { templateUrl: "/layouts/admin/post-create.html" }
      }
    })
});