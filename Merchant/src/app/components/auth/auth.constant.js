(function() {
  'use strict';

  angular
    .module('xcore.comp')
    .constant('AUTH', {

      DOMAIN_TYPE: {
        NORMAL: '1',
        ROOT: '9'
      },

      USER_TYPE: {
        NORMAL: '1',
        DOMAIN_MANAGER: '8',
        SUPERVISOR: '9'
      }

    });

})();
