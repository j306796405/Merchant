(function() {
  'use strict';

  angular
    .module('xcore.main')
    .run(runBlock);


  runBlock.$inject = [
    '$log',
    '$http',
    '$window',
    '$state',
    '$rootScope',
    'comp.session.sessionService',
    'comp.auth.authorityService',
    '$injector'
  ];
  function runBlock(
    $log,
    $http,
    $window,
    $state,
    $rootScope,
    sessionService,
    authorityService,
    $injector) {

    // register the listener for checking the session when first entering index.html
    var unbindStateChangeStart = $rootScope.$on('$stateChangeStart', function(e, toState) {
      if(toState.name === "xcore"){
        if (!$rootScope.session) {
          e.preventDefault();
          sessionService.syncSession().then(function(session) {
            unbindStateChangeStart();
            $rootScope.session = session;


            //$log.log(authorityService.getFullAuthorities());

            $state.go('xcore', {location: false});
          }, function(errMsg) {
            $log.warn(errMsg);
            $window.location.href = 'login.html';
          });
        }
      }
    });



  }




})();
