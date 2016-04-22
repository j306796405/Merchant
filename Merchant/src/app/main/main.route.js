/**!
 * main.route
 * @author
 * @create 2016-04-17 14:01
 */
(function () {
    'use strict';

    angular
        .module('xcore.main')
        .config(routerConfig);

    routerConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        'xcore.sidebar_menu_setting'
    ];
    function routerConfig($stateProvider, $urlRouterProvider, sidebarSetting) {
        $urlRouterProvider.otherwise('/');


        $stateProvider
            .state('xcore', {
                url: '/',
                templateUrl: 'app/main/view/main.html',
                controller: 'main.MainController',
                controllerAs: 'main'
            })
            .state('xcore._blank', {
                template: '<div></div>'
            });

        /* $stateProvider
         .state('xcore.product_publish', {
         templateUrl: 'app/business/product/publish/view/main.html'
         });*/

        for (var menu in sidebarSetting.menu) {
            for (var submenu in sidebarSetting.menu[menu].submenu) {
                var menuState=sidebarSetting.menu[menu].state;
                var submenuState=sidebarSetting.menu[menu].submenu[submenu].state;
                var state = "xcore." + menuState + "_" +submenuState;
                var url = 'app/business/' + menuState + "/" + submenuState + '/view/main.html'
                console.log("state=" + state+","+"url="+url);
                $stateProvider
                    .state(state, {
                        templateUrl: url
                    });
            }
        }

    }

})();
