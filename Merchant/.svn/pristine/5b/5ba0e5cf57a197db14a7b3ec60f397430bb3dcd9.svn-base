(function() {
  'use strict';

  angular
    .module('xcore.comp')
    .directive('xcAuthCode', authCode);


  authCode.$inject = [
    'comp.session.sessionService'
  ];
  function authCode(sessionService) {

    return {
      restrict: 'A',
      link: linkFunc
    };

    function linkFunc(scope, element, attrs) {
      var authCode = attrs.xcAuthCode;
      var hasAuthority = sessionService.hasAuthority(authCode);
      if (!hasAuthority) {
        if ('BUTTON' == $(element).prop('nodeName')) {
          var $nElem = $('<span></span>');
          $nElem.text($(element).text());
          $nElem.attr('class', $(element).attr('class'));
          $nElem.addClass('disabled');
          $(element).replaceWith($nElem);
          $nElem.attr('title', '您无权执行此操作');
          $nElem.tooltip();
        }


      }

    }


  }

})();
