app.controller('postCtrl', ['$scope', '$rootScope', '$state', 'Api', 'toaster', '$sce', '$sanitize', function($scope, $rootScope, $state, Api, toaster, $sce, $sanitize) {
    if ($state.params.id) {
        Api.get('post?id=' + $state.params.id).success(function(res) {
            $scope.post = res.data[0];
            $rootScope.title = res.data[0].title;
        });
    }
    $scope.renderHtml = function(value) {
        return $sanitize(value);
    };
    Api.get('users?auth=2').success(function(res){
        $scope.auths = res.data;
    });
    var base_url_syntax = '/public/plugins/syntaxhighlighter/scripts/';
    SyntaxHighlighter.autoloader(['js', 'jscript', 'javascript', base_url_syntax + 'shBrushJScript.js'], ['bash', 'shell', base_url_syntax + 'shBrushBash.js'], ['css', base_url_syntax + 'shBrushCss.js'], ['xml', base_url_syntax + 'shBrushXml.js'], ['sql', base_url_syntax + 'shBrushSql.js'], ['php', base_url_syntax + 'shBrushPhp.js'], ['as3', base_url_syntax + 'shBrushAS3.js'], ['applescript', base_url_syntax + 'shBrushAppleScript.js'], ['bash', base_url_syntax + 'shBrushBash.js'], ['csharp', base_url_syntax + 'shBrushCSharp.js'], ['cf', base_url_syntax + 'shBrushColdFusion.js'], ['cpp', base_url_syntax + 'shBrushCpp.js'], ['delphi', base_url_syntax + 'shBrushDelphi.js'], ['diff', base_url_syntax + 'shBrushDiff.js'], ['erl', base_url_syntax + 'shBrushErlang.js'], ['groovy', base_url_syntax + 'shBrushGroovy.js'], ['java', base_url_syntax + 'shBrushJava.js'], ['javafx', base_url_syntax + 'shBrushJavaFX.js'], ['perl', base_url_syntax + 'shBrushPerl.js'], ['plain', base_url_syntax + 'shBrushPlain.js'], ['applescript', base_url_syntax + 'shBrushPowerShell.js'], ['ps', base_url_syntax + 'shBrushAppleScript.js'], ['python', base_url_syntax + 'shBrushPython.js'], ['ruby', base_url_syntax + 'shBrushRuby.js'], ['scss', base_url_syntax + 'shBrushSass.js'], ['scala', base_url_syntax + 'shBrushScala.js'], ['vb', base_url_syntax + 'shBrushVb.js']);
    SyntaxHighlighter.all();
}])