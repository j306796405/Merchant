/**!
 * specifications-show-tabs-directive
 * @author jianglj
 * @create 2016-04-19 11:43
 */
(function() {
    'use strict';

    angular
        .module('xcore.biz.product')
        .directive('xcSpecificationsShowTabs', specificationsShowTabs);


    specificationsShowTabs.$inject = [

    ];
    function specificationsShowTabs() {

        return {
            restrict: 'AE',
            link: linkFunc
        };

        function linkFunc(scope, element, attrs) {
            var $element = $(element);
            $(element).on('change', function(){
                var $this = $(this),
                    isChecked = $this.prop("checked"),
                    index = $this.parents('.J_specifications_checkbox_item').eq(0).index(),
                    $J_productStandardItem = $('.J_productSpecificationItem').eq(index);
                if(isChecked){
                    $J_productStandardItem.removeClass('hidden');
                }else{
                    $J_productStandardItem.addClass('hidden');
                }

            })
        }


    }

})();