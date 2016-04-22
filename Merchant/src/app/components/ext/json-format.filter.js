(function() {
  'use strict';

  angular
    .module('xcore.comp')
    .filter('xc_json_format', jsonFormat);

  function jsonFormat() {
    return function(input) {

      var result = '';


      if (input) {
        console.log(JSON.parse(input));
        result = JSON.stringify(JSON.parse(input), null, 2);
      }

      return result;
    }
  }

})();
