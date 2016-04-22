/**!
 * publish.service.js
 * @author jianglj
 * @create 2016-04-19 09:49
 */
(function () {
    'use strict';

    angular
        .module('xcore.biz.product')
        .factory('product.publish.publishService', publishService);
    publishService.$inject = [
        '$log',
        '$http',
        '$q',
        'comp.rest.restAccessor'
    ];
    function publishService($log, $http, $q, restAccessor) {

        return {
            getProductInfo: getProductInfo,
            getSingleProduct: getSingleProduct,
            createDelivery: createDelivery
        };

        function getProductInfo(uri, pathVariable, filterParam) {
            return restAccessor.get(uri, pathVariable, filterParam)
                .then(function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse.data.message);
                    });
        }

        function getSingleProduct(uri, pathVariable, filterParam) {
            return restAccessor.get(uri, pathVariable, filterParam)
                .then(function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse.data.message);
                    });
        }

        function createDelivery(uri, pathVariable, data){
            return restAccessor.post(uri, pathVariable, data)
                .then(function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse.data.message);
                    });
        }
    }

})();
