(function() {
  'use strict';

  angular.module('xcore.comp')
    .factory('comp.notification.notificationService', notificationService);

  function notificationService() {

    return {

      notify: notifyFunc,
      primary: primaryFunc,
      success: successFunc,
      info: infoFunc,
      warning: warningFunc,
      danger: dangerFunc

    }


    function notifyFunc(title, message) {
      $.gritter.add({
        title: title,
        text: message,
        sticky: false,
        class_name: 'dark'
      });
    }

    function primaryFunc(title, message) {
      $.gritter.add({
        title: title,
        text: message,
        sticky: false,
        class_name: 'primary'
      });
    }

    function successFunc(title, message) {
      $.gritter.add({
        title: title,
        text: message,
        sticky: false,
        class_name: 'success'
      });
    }

    function infoFunc(title, message) {
      $.gritter.add({
        title: title,
        text: message,
        sticky: false,
        class_name: 'info'
      });
    }

    function warningFunc(title, message) {
      $.gritter.add({
        title: title,
        text: message,
        sticky: false,
        class_name: 'warning'
      });
    }

    function dangerFunc(title, message) {
      $.gritter.add({
        title: title,
        text: message,
        sticky: false,
        class_name: 'danger'
      });
    }



  }

})();
