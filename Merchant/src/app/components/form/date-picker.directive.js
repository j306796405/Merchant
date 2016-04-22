(function() {
  'use strict';

  angular
    .module('xcore.comp')
    .directive('xcFormDatePicker', formDatePicker);

  function formDatePicker() {

    return {
      restrict: 'A',
      replace: false,
      link: linkFunc
    };

    function linkFunc(scope, element, attrs) {
      $(element).datepicker({
        todayHighlight: !0,
        autoclose: true,
        format: 'yyyy-mm-dd',
        clearBtn: !0
      });
    }


  }

})();
