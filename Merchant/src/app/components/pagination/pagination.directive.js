(function() {
  'user strict';

  angular.module('xcore.comp').directive('xcPagination',[function(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/pagination/pagination.html',
      scope: {
        pagination: '=',
        xhrProcessing: '='
      },
      link: linkFunc
    };

    function linkFunc(scope, element, attrs){

      // initialize the pagination


      // 变更当前页
      scope.changeCurrentPage = function(item) {
        if(scope.xhrProcessing) {
          return;
        }
        scope.pagination.currentPage = item;
      };

      // 定义分页的长度必须为奇数 (default:9)
      scope.pagination.pagesLength = parseInt(scope.pagination.pagesLength) ? parseInt(scope.pagination.pagesLength) : 9 ;
      if(scope.pagination.pagesLength % 2 === 0){
        // 如果不是奇数的时候处理一下
        scope.pagination.pagesLength = scope.pagination.pagesLength -1;
      }

      // pageList数组
      function getPagination(newValue, oldValue) {

        // numberOfPages
        scope.pagination.numberOfPages = Math.ceil(scope.pagination.totalItems/scope.pagination.itemsPerPage);


        if(scope.pagination.currentPage < 1){
          scope.pagination.currentPage = 1;
        }
        if(scope.pagination.numberOfPages > 0 && scope.pagination.currentPage > scope.pagination.numberOfPages){
          scope.pagination.currentPage = scope.pagination.numberOfPages;
        }


        scope.pageList = [];
        if(scope.pagination.numberOfPages <= scope.pagination.pagesLength){
          for(var i =1; i <= scope.pagination.numberOfPages; i++){
            scope.pageList.push(i);
          }
        }else{
          var offset = (scope.pagination.pagesLength - 1)/2;
          if(scope.pagination.currentPage <= offset + 1){
            for(var i = 1; i <= scope.pagination.pagesLength; i++){
              scope.pageList.push(i);
            }
          }else if(scope.pagination.currentPage > scope.pagination.numberOfPages - offset - 1){
            for(var i = scope.pagination.numberOfPages - scope.pagination.pagesLength + 1; i <= scope.pagination.numberOfPages; i++){
              scope.pageList.push(i);
            }
          }else{
            for(var i = scope.pagination.currentPage - offset ; i <= scope.pagination.currentPage + offset; i++){
              scope.pageList.push(i);
            }
          }
        }

        if(scope.pagination.onChange){
          if(oldValue != newValue) {
            scope.pagination.onChange();
          }
        }
        scope.$parent.pagination = scope.pagination;
      }

      // prevPage
      scope.prevPage = function(){
        if(scope.xhrProcessing) {
          return;
        }
        if(scope.pagination.currentPage > 1){
          scope.pagination.currentPage -= 1;
        }
      };

      // nextPage
      scope.nextPage = function(){
        if(scope.xhrProcessing) {
          return;
        }
        if(scope.pagination.currentPage < scope.pagination.numberOfPages){
          scope.pagination.currentPage += 1;
        }
      };

      // startPage
      scope.startPage = function() {
        if(scope.xhrProcessing) {
          return;
        }
        scope.pagination.currentPage = 1;
      }

      // endPage
      scope.endPage = function() {
        if(scope.xhrProcessing) {
          return;
        }
        scope.pagination.currentPage = scope.pagination.numberOfPages;
      }

      // check
      scope.$watch(function() {
        if(!scope.pagination.totalItems) {
          scope.pagination.totalItems = 0;
        }
        var newValue = scope.pagination.totalItems + ' ' +  scope.pagination.currentPage;
        return newValue;
      }, getPagination);

    }

  }]);


})();
