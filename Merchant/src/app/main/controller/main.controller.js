/**!
 * main.controller.js
 * @author jianglj
 * @create 2016-04-15 15:20
 */
(function(){

    angular
        .module('xcore.main')
        .controller('main.MainController', MainController);

    MainController.$inject = [
        '$log',
        '$window',
        '$scope',
        '$state'
    ];

    function MainController($log, $window, $scope, $state) {
        var vm = this;

        // $state.go('xcore.product_publish');
    }
})();
