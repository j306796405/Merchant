/**!
 * main.controller.js
 * @author jianglj
 * @create 2016-04-18 11:11
 */
(function() {
    'use strict';

    angular
        .module('xcore.biz.product')
        .controller('product.publish.MainController', mainController);

    mainController.$inject = [
        '$controller',
        '$state',
        '$scope'
    ];
    function mainController($controller, $state, $scope) {
        var vm = this;
        $scope.form = {

        };
        
        vm.isDelivery = function(){
            if($scope.isDelivery){
                $state.go('xcore.product_publish.delivery');
            }
        }
        
        vm.save = function(){
            if($scope.isDelivery){
                $scope.$broadcast('saveDelivery');
            }else{
                $scope.$broadcast('saveNotDelivery');
            }
        }
    }

})();
