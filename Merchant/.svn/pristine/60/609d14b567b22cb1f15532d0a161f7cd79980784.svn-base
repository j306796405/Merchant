/***
 * 修改用户密码路由配置
 */
(function() {
  'use strict';

  angular
    .module('xcore.biz.info')
    .config(routerConfig);

  routerConfig.$inject = [
    '$stateProvider'
  ];
  function routerConfig($stateProvider) {

    var basePath = 'app/business/info/modifypwd/';
    var baseState = 'xcore.info_modifypwd.';
    var basePackage = 'info.modifypwd.';

    $stateProvider
      .state(baseState + 'main', {
        templateUrl: basePath + 'view/main.html',
        controller: basePackage + 'MainController'
      })
  }

})();
