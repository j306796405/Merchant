(function() {
  'use stricts';

  angular
    .module('xcore.comp')
    .factory('comp.util.stringUtil', stringUtil);

  function stringUtil() {
    return {

      getUTF8Length: getUTF8LengthFunc

    }

    function getUTF8LengthFunc(string) {

      var utf8length = 0;
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utf8length++;
        }
        else if((c > 127) && (c < 2048)) {
          utf8length = utf8length+2;
        }
        else {
          utf8length = utf8length+3;
        }
      }
      return utf8length;

    }

  }

})();
