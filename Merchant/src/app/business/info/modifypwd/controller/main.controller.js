(function() {
    'use strict';

    angular
        .module('xcore.biz.info')
        .controller('info.modifypwd.MainController', MainController);

    MainController.$inject = [
        '$timeout',
        '$state',
        '$scope',
        'comp.notification.notificationService',
        'comp.auth.authorityService',
        'auth.domain.domainService'
    ];
    function MainController($timeout, $state, $scope, notificationService, authorityService, domainService) {



        /** 域数据模型 */
        $scope.domain = {
            code: '',
            name: '',
            remark: '',
            resources: []
        };

        /** 权限树 相关模型 */
        $scope.artAuthArry = [];
        $scope.artResourceIds = [];
        $scope.artCallback = {};

        /** 提交保存域 */
        $scope.submit = submitFunc;

        /** 返回到域列表页 */
        $scope.toMain = toListDomainFunc;


        _init();


        function _init() {

            // initialize the auth tree
            $scope.artAuthArry = authorityService.getFullAuthorities();
            $timeout(function() {
                $scope.artCallback.makeTree(function() {
                    $scope.floatViewReady();
                });
            });

        }

        function toListDomainFunc() {
            $state.go('xcore.auth_domain', {location: false});
            $scope.toMainView();
        }

        function submitFunc() {
            $scope.domainCreateForm.validate();
            if (!$scope.domainCreateForm.isValid()) {
                return;
            }

            $scope.domain.resources = [];
            var selectedResourceIds = $scope.artCallback.getSelectedResourceIds();

            for (var i = 0; i < selectedResourceIds.length; i++) {
                $scope.domain.resources.push({id: selectedResourceIds[i]});
            }

            domainService.createDomain($scope.domain).then(
                function(data) {
                    notificationService.notify('成功', '创建域[' + data.name + ']成功');
                    $scope.toMain();
                    $scope.listData();
                },
                function(errMsg) {
                    notificationService.notify('失败', errMsg);
                }
            );

        }

    }

})();
