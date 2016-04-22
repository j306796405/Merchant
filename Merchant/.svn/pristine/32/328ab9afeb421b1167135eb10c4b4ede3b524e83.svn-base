(function() {
  'use strict';

  angular.module('xcore.comp')
    .controller('comp.ext.controller.PaginationDataGridController', pgDataGridController);

  pgDataGridController.$inject = [
    '$controller',
    '$scope',
    'comp.notification.notificationService'
  ];
  function pgDataGridController($controller, $scope, notificationService) {

    $controller('comp.ext.controller.MainFloatController', {$scope: $scope});

    // pagination model
    $scope.pagination = {
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      pagesLength: 9,
      onChange: listDataFunc
    };
    // filter model
    $scope.filter = {};

    // data collection model
    $scope.collection = [];

    // load data
    $scope.listData = listDataFunc;

    function listDataFunc() {
      var filterParam = {};
      angular.copy($scope.filter, filterParam);
      filterParam.last_cursor = ($scope.pagination.currentPage - 1) * $scope.pagination.itemsPerPage;
      filterParam.count = $scope.pagination.itemsPerPage;

      $scope.getCollection(filterParam).then(
        function(data) {
          $scope.pagination.totalItems = data.total_count;
          $scope.collection = data.collection;
        },
        function(errMsg) {
          notificationService.danger('异常', errMsg);
        }
      );
    }

  }
})();
