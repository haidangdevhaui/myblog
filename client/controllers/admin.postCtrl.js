app.controller('admin.postCtrl', ['$scope', '$rootScope', '$state', 'Api', 'toaster', '$sce', function($scope, $rootScope, $state, Api, toaster, $sce) {
    $rootScope.title = 'Đăng bài viết';
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false,
        extraPlugins : 'syntaxhighlight'
    };
    $scope.onReady = function() {
        
    };
    $scope.post = {
        category: ''
    };
    // if($state.current.name == 'admin-post-create'){
    //     Api.get('category').success(function(res){
    //         $scope.dataCates = res.data;
    //     });
    // }
    $scope.createPost = function(dataPost){
        if(!dataPost.file){
            return toaster.pop('warning', '', 'Hãy chọn ảnh cho bài viết!');
        }
        Api.multiPost('admin/post/create', dataPost).success(function(res){
            toaster.pop('success', '', 'Đăng bài viết thành công!');
            $scope.post = {};
        });
    }
}])
