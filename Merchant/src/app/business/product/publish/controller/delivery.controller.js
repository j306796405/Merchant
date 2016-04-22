/**!
 * delivery.controller
 * @author jianglj
 * @create 2016-04-18 10:58
 */
(function () {
    'use strict';

    angular
        .module('xcore.biz.product')
        .controller('product.publish.DeliveryController', DeliveryController);

    DeliveryController.$inject = [
        '$timeout',
        '$state',
        '$scope',
        '$rootScope',
        'product.publish.publishService',
        'comp.util.arrayUtil',
        'settings'
    ];
    function DeliveryController($timeout, $state, $scope, $rootScope, publishService, arrayUtil, settings) {


        //*********************************************


        var vm = this;
        vm.MERCHANT = settings.backend.merchant;
        vm.rest = {};
        vm.filterList = [];
        vm.filterBy = [];
        vm.product = $scope.form.product = {
            purchaseProducts: [],
            info: {},
            specifications: [],
            properties: [],
            parameters: [],
            pics: [],
            detailDesc: ''
        };

        _init();

        function _init() {
            vm.relate_num_select = [
                {name: '1', id: '1'},
                {name: '2', id: '2'},
                {name: '3', id: '3'},
                {name: '4', id: '4'},
                {name: '5', id: '5'},
                {name: '6', id: '6'},
                {name: '7', id: '7'},
                {name: '8', id: '8'},
                {name: '9', id: '9'},
                {name: '10', id: '10'}
            ];
            vm.relate_num = vm.relate_num_select[0].id;
            vm.filterBySelect = [
                {name: '按商品名称查询', id: 'name'},
                {name: '按采购SKU号查询', id: 'SKU'}
            ];
            vm.filterBy[0] = vm.filterBySelect[0].id;
            vm._relateProduct = _relateProduct;
            vm._loadProductInfo = _loadProductInfo;
            vm._selectProduct = _selectProduct;
            vm._unlinkProduct = _unlinkProduct;
            vm._addEmptySpecification = _addEmptySpecification;
            vm._removeSpecification = _removeSpecification;
            vm._addEmptyParameters = _addEmptyParameters;
            vm._removeParameters = _removeParameters;
            vm._remoteUrlRequestBySKU = _remoteUrlRequestBySKU;
            vm._remoteUrlRequestByName = _remoteUrlRequestByName;
            vm._selectAutoComplete = _selectAutoComplete;
            vm._focusOut = _focusOut;
            vm.isLoadInfo = false;

            _relateProduct(1);

            function _relateProduct(repeat) {
                $scope.form.product.purchaseProducts = [];
                for (var i = 0; i < repeat; i++) {
                    var products = $scope.form.product.purchaseProducts;
                    var relateProduct = new RelateProduct([], [], 0, 0, products.length);
                    products.push(relateProduct);
                    vm.filterList[i] = {
                        codes: [],
                        list: []
                    };
                    vm.filterBy[i] = vm.filterBySelect[0].id;
                }

                function RelateProduct(linkProducts, ppIds, nums, isMain, grpNo) {
                    this.linkProducts = linkProducts;
                    this.ppIds = ppIds;
                    this.nums = nums;
                    this.isMain = isMain;
                    this.grpNo = grpNo;
                }
            }

            function _selectProduct($event, item) {
                var $this = $($event.target),
                    pprId = item.pprId;
                publishService.getSingleProduct('/merchant/purchase-products/detail/:pprId', {pprId: pprId}, null)
                    .then(function (product) {
                        if ($.inArray(product.pprId, item.ppIds) < 0) {
                            item.linkProducts.push(product);
                            item.ppIds.push(product.pprId);
                        }else{
                            alert('已经加过改产品');
                        }
                    }, function (errResponse) {
                        console.log(errResponse);
                    })
            }

            function _loadProductInfo($event, item) {
                if (!item.ppIds.length) {
                    alert('请先关联数据!');
                    item.isMain = 0;
                    return;
                }
                publishService.getProductInfo('/merchant/purchase-products/class', null, {code : item.ppIds[0]})
                    .then(function (product) {
                        vm.rest.productInfo = product;
                        vm.rest.productInfo.classes.attributes = arrayUtil.groupArray(vm.rest.productInfo.classes.attributes, 3);
                        $scope.form.product.info.purchaseClass = product.classes.pcCode;
                        $scope.form.product.info.brandCode = product.brand.brancCode;
                        vm.isLoadInfo = true;
                    }, function (errResponse) {
                        console.log(errResponse);
                    })
            }

            function _unlinkProduct($event, item, linkProduct) {
                item.ppIds = _.without(item.ppIds, linkProduct.pprId);
                item.linkProducts = _.without(item.linkProducts, linkProduct);
            }

            function _addEmptySpecification(items) {
                items.values.push({
                    pvid: 0,
                    name: ''
                })
            }

            function _removeSpecification(items, index) {
                items.splice(index, 1);
            }

            function _addEmptyParameters(items) {
                items.push({
                    "ppid": 0,
                    "name": "",
                    "multiSelect": "1",
                    "showName": "测试测试",
                    "values": [
                        {
                            "pvid": 0,
                            "name": ""
                        }
                    ]
                })
            }

            function _removeParameters(items, index) {
                items.splice(index, 1);
            }

            function _remoteUrlRequestBySKU(str) {
                return {
                    sku: str,
                    baCode: 'A001'//$rootScope.session.saCode
                };
            }

            function _remoteUrlRequestByName(str) {
                return {
                    name: str,
                    baCode: 'A001'//$rootScope.session.saCode
                };
            }

            function _selectAutoComplete(selected) {
                var index = this.id;
                if (selected) {
                    $scope.form.product.purchaseProducts[index].pprId = selected.originalObject.pprId;
                } else {
                    $scope.form.product.purchaseProducts[index].pprId = null;
                }
            }

            function _focusOut() {

            }

            $scope.$on('saveDelivery', function(event,data) {
                collectSpecifications();
                collectProperties();
                collectParameters();
                console.log($scope.form.product);

                publishService.createDelivery('/product/inwarehousing', null, {
                    product: $scope.form.product
                });

                function collectSpecifications(){
                    var specifications = $scope.form.product.specifications = [];
                    $('.J_productSpecificationItem:visible').each(function(i){
                        var $this = $(this),
                            ppId, pvId, isGlobal;
                        isGlobal = $this.find('input:checked').data('isglobal');

                        ppId = $this.find('.format-title').data('ppid');
                        if(isGlobal){
                            pvId = $this.find('input:checked').val();
                        }else{
                            pvId = $this.find('.J_val').val();
                        }

                        specifications.push({
                            "ppId": ppId,
                            "pvId": pvId,
                            "isGlobal": isGlobal
                        })
                    })
                }

                function collectProperties(){
                    var properties = $scope.form.product.properties = [];
                    $('.pro-property-box li').each(function(i){
                        var $this = $(this),
                            $element,
                            ppId, pvIds = [], isText;

                        $element = $this.find('.form-ele');
                        ppId = $this.find('.key').data('ppid');
                        if(!$this.find('.checkgroup').length){
                            pvIds.push($element.val());
                        }else{
                            $this.find('.table-check:checked').each(function(i, checkbox){
                                pvIds.push($(checkbox).val());
                            })
                        }
                        isText = $element.prop('type') === 'text' ? 1 : 0;
                        properties.push({
                            "ppId": ppId,
                            "pvIds": pvIds,
                            "isText": isText
                        })
                    })
                }

                function collectParameters(){
                    var parameters = $scope.form.product.parameters = [];
                    $('.J_parameter-box .J_parameter-item').each(function(){
                        var $this = $(this),
                            ppId, pvName, isGlobal;

                        isGlobal = $(this).find('.J_val').data('isglobal');
                        if(isGlobal){
                            ppId = $this.find('.J_key').data('ppid');
                        }else{
                            ppId = $this.find('.J_key').val();
                        }
                        pvName = $this.find('.J_val').val();

                        parameters.push({
                            ppId: ppId,
                            pvName: pvName,
                            isGlobal: isGlobal
                        });
                    })
                }

            });
        }
    }

})();
