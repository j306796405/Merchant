/**!
 * array-util.service
 * @author jianglj
 * @create 2016-04-19 18:29
 */
(function() {
    'use stricts';

    angular
        .module('xcore.comp')
        .factory('comp.util.arrayUtil', arrayUtil);

    function arrayUtil() {
        return {

            groupArray: groupArray

        }

        function groupArray(arr, num) {
            var newArray = [];
            $.each(arr, function(i, v){
                if(i % num === 0){
                    newArray.push([]);
                }
                newArray[newArray.length - 1].push(v);
            })
            return newArray;
        }

    }

})();
