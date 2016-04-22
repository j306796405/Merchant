/**!
 * sidebar.directive.js
 * @author jianglj
 * @create 2016-04-15 16:10
 */
(function() {
    'use strict';

    angular
        .module('xcore.main')
        .directive('xcMainSideBar', sideBar);

    sideBar.$inject = [
        'xcore.sidebar_menu_setting'
        
    ];

    function sideBar(setting) {
        var directive = {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/main/view/sidebar.html',
            controller: controllerFunc,
            controllerAs: 'vm',
            link: linkFunc

        };

        return directive;

        controllerFunc.$inject = [
            '$scope',
            '$state'
        ];

        function controllerFunc($scope, $state) {
            var vm = this;
            vm.sideBar = setting;
        }

        function linkFunc(scope, el) {

        }

    }

})();
