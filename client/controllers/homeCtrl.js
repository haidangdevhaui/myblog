app.controller('homeCtrl', ['$scope', '$rootScope', '$state', 'Api' ,function($scope, $rootScope, $state, Api){
	$scope.getListPost = function(page, record){
		if($state.current.name == 'category'){
			$rootScope.title = 'Category ' + $state.params.id;
			return Api.get('post?page=' + page + '&record=' + record + '&category=' + $state.params.id).success(function(res){
				$scope.posts = res.data;
			});
		}
		if($state.current.name == 'tag'){
			$rootScope.title = 'Tag ' + $state.params.id;
			return Api.get('post?page=' + page + '&record=' + record + '&tag=' + $state.params.id).success(function(res){
				$scope.posts = res.data;
			});
		}
		return Api.get('post?page=' + page + '&record=' + record).success(function(res){
			$rootScope.title = 'DevOps - Fullstack Development';
			$scope.posts = res.data;
		});
	};
	$scope.getListPost(1, 10);
	Api.get('users?auth=2').success(function(res){
	    	$scope.auths = res.data;
	});
}])
