app.service('Api', ['$http', function($http) {
    var obj = {};
    obj.get = function(route) {
        return $http.get('/api/v1/' + route);
    }
    obj.post = function(route, data){
        return $http.post('/api/v1/' + route, data);
    }
    obj.multiPost = function(route, data){
        var fd = new FormData();
        fd.append('file', data.file);
        fd.append('data', angular.toJson(data));
        return $http.post('/api/v1/' + route, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        });
    }
    return obj;
}])