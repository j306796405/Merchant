(function() {
  'use strict';

  angular
    .module('xcore.comp')
    .directive('xcAuthResourceTree', authResourceTree);


  authResourceTree.$inject = [
    'comp.auth.authorityService'
  ];
  function authResourceTree(authorityService) {

    return {
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      scope: {
        "authArry": '=',  // 权限树基
        "resourceIds": '=',  // 资源 ID 列表
        "callback": '=' // 提供一些回调方法
      },
      link: linkFunc
    };

    function linkFunc(scope, element, attrs) {

      if (!scope.callback) {
        throw 'missing callback attr';
      }

      // 创建树
      scope.callback.makeTree = makeTreeFunc;
      // 获取勾选项对应的资源ID列表
      scope.callback.getSelectedResourceIds = getSelectedResourceIdsFunc;

      function makeTreeFunc(readyCallback) {

        if (!scope.authArry) {
          throw 'missing auth-arry attr';
        }
        if (!scope.resourceIds) {
          throw 'missing resource-ids attr';
        }

        // 根据资源id列表转换为符合条件的权限code列表
        var authenticatedAuthCodes = authorityService.filterAuthCodesWithResourceIds(scope.resourceIds);

        // remove original tree if exists
        if ($(element).find('.tree')) {
          $(element).find('.tree').remove();
        }

        $(element).append($('<div class="tree"></div>'));
        var $tree = $(element).find('.tree');
        $tree.css('display', 'none');

        $tree.jstree({
          plugins: ["wholerow", "checkbox", "types"],
          checkbox: {
            three_state: false,
            cascade: ''
          },
          core: {
            themes: {responsive: !1},
            data: convertAuthData2TreeData(scope.authArry)
          },
          types: {"default": {icon: "fa fa-folder text-primary fa-lg"}, file: {icon: "fa fa-file text-success fa-lg"}}
        });


        $tree.on("ready.jstree", function() {
          $tree.fadeIn(50);
          if (readyCallback) {
            readyCallback();
          }
        });


        var triggering = false;
        $tree.on("select_node.jstree", function (event, data) {
          if (triggering) {
            return;
          }
          triggering = true;
          for (var i = 0; i < data.node.children_d.length; i++) {
            $tree.jstree(true).check_node(data.node.children_d[i]);
          }
          for (var i = 0; i < data.node.parents.length; i++) {
            $tree.jstree(true).check_node(data.node.parents[i]);
          }
          triggering = false;
        });

        $tree.on("deselect_node.jstree", function (event, data) {
          if (triggering) {
            return;
          }
          triggering = true;
          for (var i = 0; i < data.node.children_d.length; i++) {
            $tree.jstree(true).uncheck_node(data.node.children_d[i]);
          }
          triggering = false;
        });


        function convertAuthData2TreeData(authData) {

          var treeData = [];

          for (var i = 0; i < authData.length; i++) {
            if (authData[i].code == 'auth') {
              continue;
            }

            treeData[i] = {};
            recursiveProcessAuthDataEntry(authData[i], treeData[i]);
          }

          return treeData;

        }

        function recursiveProcessAuthDataEntry(authDataEntry, treeDataEntry) {

          // menu group
          if (authDataEntry.sub_menus) {
            treeDataEntry.data = {code : authDataEntry.code, resource_ids: []};
            treeDataEntry.text = authDataEntry.name;
            treeDataEntry.icon = 'icon-layers auth-user-jstree-item-icon';
            treeDataEntry.state = {opened: !0, selected: isCheckd(authDataEntry.code)};
            treeDataEntry.children = [];
            for (var i = 0; i < authDataEntry.sub_menus.length; i++) {
              treeDataEntry.children[i] = {};
              recursiveProcessAuthDataEntry(authDataEntry.sub_menus[i], treeDataEntry.children[i]);
            }
          }
          // menu
          else if (authDataEntry.entry_dependencies) {
            treeDataEntry.data = {code : authDataEntry.code, resource_ids: authDataEntry.resource_ids};
            treeDataEntry.text = authDataEntry.name + ':' + authDataEntry.resource_ids.join(',');
            treeDataEntry.icon = 'icon-drawer auth-user-jstree-item-icon';
            treeDataEntry.state = {selected: isCheckd(authDataEntry.code)};
            if (authDataEntry.events) {
              treeDataEntry.children = [];
              for (var i = 0; i < authDataEntry.events.length; i++) {
                treeDataEntry.children[i] = {
                  data: {code : authDataEntry.events[i].code, resource_ids: authDataEntry.events[i].resource_ids},
                  text: authDataEntry.events[i].name + ':' + authDataEntry.events[i].resource_ids.join(','),
                  icon: 'icon-support auth-user-jstree-item-icon',
                  state: {selected: isCheckd(authDataEntry.events[i].code)}
                }
              }
            }
          }

        }


        function isCheckd(code) {
          for (var i = 0; i < authenticatedAuthCodes.length; i++) {
            if (authenticatedAuthCodes[i].indexOf(code) >= 0) {
              return true;
            }
          }
          return false;
        }


      }

      function getSelectedResourceIdsFunc() {

        var resourceIds = [];
        if (!$(element).find('.tree')) {
          return resourceIds;
        }

        var $tree = $(element).find('.tree');

        var authData = {};
        var selectedNodes = $tree.jstree().get_selected(true);
        for (var i = 0; i < selectedNodes.length; i++) {
          for (var j = 0; j < selectedNodes[i].data.resource_ids.length; j++) {
            authData[selectedNodes[i].data.resource_ids[j]] = true;
          }
        }

        for (var id in authData) {
          resourceIds.push(id);
        }

        return resourceIds;

      }


    }


  }

})();
