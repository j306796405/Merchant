(function() {
    'use strict';

    angular
        .module('xcore')
        .controller('sidebar.MainController', MainController);

    MainController.$inject = [
        '$log',
        '$window',
        '$scope',
        'comp.notification.notificationService',
        'comp.session.sessionService'
    ];
    function MainController($log, $window, $scope, notificationService, sessionService) {
        var vm = this;

        vm.passwordModification = {
            originPassword: '',
            retypeOriginPassword: '',
            newPassword: ''
        };

        // sign out
        vm.signOut = signOutFunc;

        // modify password
        vm.openModifyPasswordDialog = openModifyPasswordDialogFunc;
        vm.modifyPassword = modifyPasswordFunc;

        function signOutFunc() {
            sessionService.destroySession().then(
                function() {
                    $window.location.href = 'login.html';
                },
                function() {
                    $window.location.href = 'login.html';
                }
            );
        }

    }

})();
