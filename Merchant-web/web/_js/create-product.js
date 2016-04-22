/**
 * Created by jianglinj on 2016/4/13.
 */
$(function(){
    var mainModel = new MainModel(),
        vm,
        WAREHOUSING = '',
        NOTWAREHOUSING = '';

    _init();

    /*********** 模型 S *********/
    function MainModel(){

    }

    function VM(){

    }

    VM.prototype.setVm = function(key, value){
        this[key] = value;
    }

    /**
     * 关联采购商品模型
     * */
    function PurchaseProductModel(pprIds, nums, isMain, grpNo){
        this.pprIds = pprIds;
        this.nums = nums;
        this.isMain = isMain;
        this.grpNo = grpNo;
    }

    MainModel.prototype.setPurchaseProductsModel = function(purchaseProducts){
        this.purchaseProducts = purchaseProducts;
    }

    /**
     * 商品基本信息模型
     * */
    function InfoModel(purchaseClass, brandCode, name, summary){
        this.purchaseClass = purchaseClass;
        this.brandCode = brandCode;
        this.name = name;
        this.summary = summary;
    }

    MainModel.prototype.setInfoModel = function(info){
        this.info = info;
    }

    /**
     * 单个商品规格模型
     * ppId: "001",//属性键KEY
     * pvId: "0001",//属性值KEY
     * isGlobal: "1" //是否是全局属性，1：是，0：否
     * */
    function SpecificationModel(ppId, pvId, isGlobal){
        this.ppId = ppId;
        this.pvId = pvId;
        this.isGlobal = isGlobal;
    }

    /**
     * 商品规格模型
     * */
    function SpecificationsModel(specifications){
        this.specifications = specifications;
    }

    MainModel.prototype.setSpecificationsModel = function(specifications){
        this.specifications = specifications;
    }

    /**
     * 商品属性模型
     * */
    function PropertiesModel(properties){
        this.properties = properties;
    }

    MainModel.prototype.setPropertiesModel = function(properties){
        this.properties = properties;
    }

    /**
     * 图片模型
     * */
    MainModel.prototype.setPicsModel = function(pics){
        this.pics = pics;
    }

    /**
     * 单个商品参数模型
     * */
    function ParameterModel(ppId, pvId, isGlobal){
        this.ppId = ppId;
        this.pvId = pvId;
        this.isGlobal = isGlobal;
    }

    /**
     * 商品参数模型
     * */
    function ParametersModel(parameters){
        this.parameters = parameters;
    }

    /**
     * 商品详情模型
     * */
    MainModel.prototype.setDetailDescModel = function(pics){
        this.pics = pics;
    }
    /*********** 模型 E *********/

    /*********** ajax初始化请求 S *********/
    //产品规格ajax初始化请求
    function getSpecificationsByAjax(callback){
        $.ajax({
                url: "../json/specifications.json",
                type:"GET",
                dataType: "json",
            })
            .then(function (data) {
                vm.setVm('info', data);
                callback(vm);
            }, function () {
                console.log('商品规格请求出错');
            });
    }
    /*********** ajax初始化请求 E *********/

    //模板通用加载方法
    function _render(id, data){
        return template(id, data);
    }

    //关联商品数量模块
    function _renderRelatedProductView(){
        var number = +$('#relativeProductNum').val(),
            $relativeProductView = $('#relativeProductView');
        var relatedProView = _render('Warehouse.RelatedPro', {
            repeat: number
        });
        $relativeProductView.empty().html(relatedProView);
        $relativeProductView.find("[name='isMain']").one('change', function(){
            _productInfoRender();
        })
    }

    (function(){
        $('#ifWarehouseView').on('click', '#relativeProductNumBtn', function(){
            _renderRelatedProductView();
        })

        //渲染关联产品表格
        $('#ifWarehouseView').on('click', '.J_relatedBtn', function(){
            var $itemRoot = $(this).closest('.related-pro'),
                $tbody = $itemRoot.find('tbody');
            var relatedProView = _render('Warehouse.RelatedProTableTr', {});
            $tbody.append(relatedProView);
        })
    })();

    //产品规格，图片，参数，详情初始化
    function _productInfoRender(){
        getSpecificationsByAjax(function(vm){
            var productInfoView = _render('Warehouse.ProductInfo', vm);
            $('#productInfoView').empty().html(productInfoView);
        });

        //初始化图片上传
        $('#fileupload').fileupload({
            url: 'server/php/',
            previewMaxWidth: 100,
            previewMaxHeight: 100
        })

    }

    (function(){
        //上传图片左右交换位置
        $('#ifWarehouseView')
            .on('click', '.pic-list .sort-l', function(){
                var $item = $(this).closest('li')
                if($item.index() !== 1){
                    $item.prev().before($item);
                }
            })
            .on('click', '.pic-list .sort-r', function(){
                var $item = $(this).closest('li');
                if($item.next().length){
                    $item.next().after($item);
                }
            })

        //增加商品规格
        $('#ifWarehouseView').on('click', '.J_btn-add-standard', function(){
            var $addInput = $(this).prev('.hidden');
            $addInput.before($addInput.clone().removeClass('hidden'));
        })

        //删除商品规格
        $('#ifWarehouseView').on('click', '.x', function(){
            $(this).parent().fadeOut("fast");
        })

        //增加商品参数
        $('#ifWarehouseView').on('click', '.parameter-btn', function(){
            var $edit =  $('#product-param-edit').clone().removeClass('hidden');
            $('.J_product-param').append($edit);
        })

        //商品规格checkbox选择
        $('#ifWarehouseView').on('change', '.J_specifications_checkbox_item', function(){
            var $this = $(this),
                index = $this.index(),
                isChecked = $this.find(':checkbox').prop("checked"),
                $item = $('.J_productStandardItem').eq(index);

            if(isChecked){
                $item.removeClass('hidden');
            }else{
                $item.addClass('hidden');
            }

        })
    })();

    //关联商品规格模块
    function _productStandardItemRender(name, tplName){
        var productInfoView = _render('Warehouse.ProductInfo', {});
        $('#productStandardView').empty().html(productInfoView);
    }

    /********* 入仓页模型收集 S ***********/
    //关联采购商品模型收集
    function collPurchaseProductsModel(){
        var purchaseProducts = [];

        $('.related-pro').each(function(index, value){
            var $this = $(this),
                pprIds = [],
                nums,
                isMain,
                grpNo;

            $this.find('.J_pprId').each(function(i ,dom){
                pprIds.push($(dom).text());
            })
            nums = +$this.find('.J_nums').val();
            isMain = +$this.find("[name='isMain']:checked").length;
            grpNo = index;
            var purchaseProduct = new PurchaseProductModel(pprIds, nums, isMain, grpNo);
            purchaseProducts.push(purchaseProduct);
        })
        mainModel.setPurchaseProductsModel(purchaseProducts);

        return purchaseProducts;
    }

    //关联采购商品模型收集
    function collPurchaseInfoModel(){
        var purchaseClass, //采购分类
            brandCode, //品牌
            name, //商品名称
            summary; //商品卖点
        purchaseClass = $('#purchaseClass').val();
        brandCode = $('#brandCode').val();
        name = $('#brandName').val();
        summary = $('#brandSummary').val();
        var infoModel = new InfoModel(purchaseClass, brandCode, name, summary);
        mainModel.setInfoModel(infoModel);
    }

    //商品规格模型收集
    function collSpecificationsModel(){
        $('.J_productStandardItem:visible').each(function(index, val){
            var $radio = $(val).find('[type=radio]:checked'),
                isNew = $radio.data('new'),
                ppId,
                pvId,
                isGlobal;
            if(isNew){
                isGlobal = 0;
            }
            var specificationModel = new SpecificationModel();
        })
    }
    /********* 入仓页模型收集 E ***********/

    function saveForm(){
        collPurchaseProductsModel();
        collPurchaseInfoModel();
        collSpecificationsModel();
        console.log(mainModel);
    }

    function _init(){

        $('.tab-pane').on('change', 'input:radio[name=isWarehouse]', function(){
            if(!+$(this).val()){
                //不入仓
                vm = new VM();
                console.log('加载不入仓模板');
            }else{
                //入仓
                vm = new VM();
                $('#ifWarehouseView').empty().html(_render('Warehouse.Main', {}));
                _renderRelatedProductView();
            }
        })

        $('#saveFormBtn').on('click', function(){
            saveForm();
        })
    }

    (function(){
        $('#ifWarehouseView')
            .on('change', '#firstCategory, #secondCategory, #thirdCategory', function(){
                _productInfoRender();
            })
    })()
})