var app = angular.module('app',[
	'ui.router',
	'ngAnimate',
	'toaster',
	'angular-loading-bar',
	'ckeditor',
	'ngSanitize'
	]);

app.config(['cfpLoadingBarProvider','$locationProvider', function(cfpLoadingBarProvider, $locationProvider) {
	cfpLoadingBarProvider.includeSpinner = true;
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

app.controller('mainCtrl', ['$scope', '$state', '$rootScope', 'Api', '$window', function($scope, $state, $rootScope, Api, $window){
	Api.get('user').success(function(res){
		$rootScope.user = res.data[0];
	});
	$rootScope.logout = function(){
		Api.get('logout').success(function(res){
			$rootScope.user = null;
			$state.go('/');
		});
	}
	$scope.getListCategory = function(){
		Api.get('category').success(function(res){
			$rootScope.categories = res.data;
		});
	}
	$scope.getListCategory();
	$rootScope.clickCate = function(){
		$('.menu').slideUp('fast');
	}
	$rootScope.searchPost = function(s){
		Api.get('post?search=' + s).success(function(res){
			$rootScope.searchDatas = res.data;
		});
	}
	$rootScope.clickResult = function(){
		$('.search-div').fadeOut('fast');
	}
	$rootScope.goToAdmin = function(){
		$window.location.href = '/admin';
	}
	
}])