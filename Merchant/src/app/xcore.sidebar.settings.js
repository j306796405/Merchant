/***
 * 目录树定义
 */

/*<li class="sub-menu active">
    <a href="javascript:;"><span class="arrow open"></span><i class="icon-commodity"></i><span>商品</span></a>
    <ul class="sub" style="display: block">
    <li class="active"><a href="#">商品列表</a></li>
    <li><a href="#">入库商品</a></li>
    <li><a href="#">发布商品</a></li>
    </ul>
    </li>

    <li class="sub-menu">
    <a href="javascript:;"><span class="arrow"></span><i class="icon-order"></i><span>订单</span></a>
    <ul class="sub">
    <li><a href="#">订单列表</a></li>
    <li><a href="#">订单列表</a></li>
    <li><a href="#">订单列表</a></li>
    </ul>
    </li>
    <li class="sub-menu">
    <a href="javascript:;"><i class="icon-billing"></i><span>结算</span></a>
    </li>

    <li class="sub-menu">
    <a href="javascript:;"><i class="icon-news"></i><span>消息</span></a>
    </li>*/
(function () {

    'use strict';

    angular
        .module('xcore')
        .constant('xcore.sidebar_menu_setting', {

            menu: [{
                name: "商品",
                icon:"icon-commodity",
                state:"product",
                submenu: [{
                    name: "商品列表",
                    state: "list"
                },{
                    name: "入库商品",
                    state: "inwarehouse"
                },{
                    name: "发布商品",
                    state: "publish"
                }]
            },{
                name: "订单",
                icon:"icon-order",
                state:"order",
                submenu: [{
                    name: "订单列表",
                    state: "list"
                }]
            },{
                name: "商户信息",
                icon:"icon-order",
                state:"info",
                submenu: [{
                    name: "修改密码",
                    state: "modifypwd"
                }]
            }
            ]

        });


})
();
