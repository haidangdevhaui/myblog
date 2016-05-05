app.controller('userCtrl', ['$scope', '$rootScope', '$state', 'Api', 'toaster', function($scope, $rootScope, $state, Api, toaster){
	switch($state.current.name){
		case 'login':
			if($rootScope.user) return $state.go('/');
			$rootScope.title = "Đăng nhập";
			break;
		case 'register':
			if($rootScope.user) return $state.go('/');
			$scope.user = {};
			$rootScope.title = "Đăng ký thành viên";
			break;
	}
	$scope.user = {};
	$scope.login = function(user){
		Api.post('login', user).success(function(res){
			if(res.data[0].error){
				return toaster.pop('warning', '', res.data[0].error);
			}
			$rootScope.user = res.data[0];
			$state.go('/');
			toaster.pop('success', '', 'Đăng nhập thành công!\nChào mừng ' + res.data[0].username + ' đã quay lại với Blog');
		});
	}
	$scope.register = function(user){
		Api.multiPost('register', user).success(function(res){
			if(res.data[0].error){
				return toaster.pop('warning', '', res.data[0].error);
			}
			$state.go('login');
			$scope.user = {};
			toaster.pop('success', '', 'Đăng ký tài khoản thành công!\nHãy đăng nhập để sử dụng Blog');
		});
	}
}])