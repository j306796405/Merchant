(function() {
  'use strict';

  angular
    .module('xcore.comp')
    .filter('xc_status', status)
    .filter('xc_status_class', statusClass);

  function status() {
    return function(input) {
      var result = null;
      if (input == '1') {
        result = 'Enabled';
      } else if (input == '0') {
        result = 'Disabled';
      }

      return result;
    }
  }

  function statusClass() {
    return function(input) {
      var labelClass = null;
      if (input == '1') {
        labelClass = 'label label-inverse';
      } else if (input == '0') {
        labelClass = 'label label-default';
      }

      return labelClass;
    }
  }

})();
