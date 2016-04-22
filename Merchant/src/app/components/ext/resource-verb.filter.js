(function() {
  'use strict';

  angular
    .module('xcore.comp')
    .filter('xc_resource_verb_label', resourceVerb);

  function resourceVerb() {
    return function(input) {
      var labelClass = null;
      if (input == 'POST') {
        labelClass = 'label-primary';
      } else if (input == 'DELETE') {
        labelClass = 'label-danger';
      } else if (input == 'PUT' || input == 'PATCH') {
        labelClass = 'label-warning';
      } else if (input == 'GET') {
        labelClass = 'label-success';
      } else {
        labelClass = 'label-inverse'
      }

      return labelClass;
    }
  }

})();
