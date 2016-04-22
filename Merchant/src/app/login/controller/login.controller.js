(function() {
  'use strict';

  /** 记录在 Cookie 中的 Key */
  var COOKIE_KEY_USERNAME = 'UNAME';
  var COOKIE_KEY_DOMAINCODE = 'DMNCODE';
  var COOKIE_AGE = 30;  // days

  angular
    .module('xcore.login')
    .controller('login.LoginController', LoginController);

  LoginController.$inject = [
    '$log',
    '$scope',
    '$window',
    'comp.session.sessionService',
    'comp.notification.notificationService'
  ];
  function LoginController($log, $scope, $window, sessionService, notificationService) {

    $scope.loginName = '';
    $scope.password = '';
    $scope.domainCode = '';

    $scope.login = login;


    _init();


    /**
     * 从 Cookie 中读取上一次登录成功时保存的 登录名 和 域编码,并填写到表单相应的域中
     *
     * @private
     */
    function _init() {
      if (Cookies.get(COOKIE_KEY_USERNAME)) {
        $scope.loginName = Cookies.get(COOKIE_KEY_USERNAME);
      }
      if (Cookies.get(COOKIE_KEY_DOMAINCODE)) {
        $scope.domainCode = Cookies.get(COOKIE_KEY_DOMAINCODE);
      }
    }

    function login() {
      $scope.loginForm.validate();
      if (!$scope.loginForm.isValid()) {
        return;
      }
      sessionService.createSession($scope.loginName, $scope.password, $scope.domainCode).then(
        function() {
          Cookies.set(COOKIE_KEY_USERNAME, $scope.loginName, { expires: COOKIE_AGE });
          Cookies.set(COOKIE_KEY_DOMAINCODE, $scope.domainCode, { expires: COOKIE_AGE });
          $window.location.href = 'index.html';
        },
        function(errMsg) {
          notificationService.notify('异常', errMsg);
        }
      );

    }


  };

})();
