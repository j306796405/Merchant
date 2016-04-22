(function() {
  'user strict';

  angular.module('xcore.login').directive('xcEnterPress',[function(){
    return {
      restrict: 'A',
      link: linkFunc
    };

    function linkFunc(scope, element, attrs){
      element.bind("keydown keypress", function (event) {
        if(event.which === 13 && !scope.xhrProcessing) {
          event.preventDefault();
          scope.login();
        }
      });
    }

  }]);

})();
