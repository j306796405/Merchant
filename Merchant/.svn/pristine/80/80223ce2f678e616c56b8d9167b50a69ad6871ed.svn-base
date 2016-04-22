(function() {
  'use strict';

  angular.module('xcore.comp')
    .controller('comp.ext.controller.MainFloatController', MainFloatController);

  MainFloatController.$inject = [
    '$log',
    '$scope'
  ];
  function MainFloatController($log, $scope) {

    var fadeSpeed = 50;

    $scope.toMainView = toMainViewFunc;
    $scope.toFloatView = toFloatViewFunc;
    $scope.floatViewReady = floatViewReadyFunc;

    function toMainViewFunc() {
      $('#floatViewLoading').addClass('hide');
      $('#floatView').css('display','none');
      $('#mainView').fadeIn(fadeSpeed);
    }

    function toFloatViewFunc() {
      $('#mainView').css('display','none');
      $('#floatViewLoading').removeClass('hide');
    }

    function floatViewReadyFunc() {
      $('#floatViewLoading').addClass('hide')
      $('#floatView').fadeIn(fadeSpeed)
    }

  }
})();
