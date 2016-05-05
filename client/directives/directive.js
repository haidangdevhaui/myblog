app.directive('htmlParse', function($compile, $parse) {
    return {
        restrict: 'E',
        link: function(scope, element, attr) {
            scope.$watch(attr.content, function() {
                element.html($parse(attr.content)(scope));
                $compile(element.contents())(scope);
            }, true);
        }
    }
});
// app.directive('active', function($cookieStore, $compile, $parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attr) {
//             if (attr.active == $cookieStore.get('currentQuest')) {
//                 element.addClass('active');
//             }
//             element.on('click', function() {
//             	$('.examp-item').removeClass('active');
// 		      	element.addClass('active');
// 		    });
//         }
//     }
// });

app.directive('fileModel',['$parse',function($parse){
    return {
        restrict : 'A',
        link : function(scope, element, attrs){

            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change',function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                })
            })
        }
    }
}]);
