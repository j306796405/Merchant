/**
 * 本服务定义了一些用于操作权限的服务方法.
 * 对于前端而言,权限即意味着菜单与事件(按钮).
 * 下面是一个完整的权限数据结构示例:
 * --------------------------------------------------------------------------------------
 [
 {
   code: 'xpoints',
   name: '积分绩效管理',
   icon: 'aaa',
   sub_menus: [
     {
       code: 'xpoints.team-mgnt',
       name: '专项小组管理',
       entry_dependencies: [ 1231231, 1234123 ],
       events: [ { name: '创建专项小组', dependencies: [ 1231233 ] } ]
     },
   ]
 },
 ]
 * --------------------------------------------------------------------------------------
 * entry_dependencies 代表了进入所在菜单所需的权限, 同时也决定了这个菜单是否要被点亮的唯一决定因素
 * events 下的 dependencies 不可包括通菜单下 entry_dependencies 下的依赖
 *
 */

(function() {
  'use strict';

  angular
    .module('xcore.comp')
    .factory('comp.auth.authorityService', authorityService);

  authorityService.$inject = [
    '$log',
    '$q',
    '$rootScope',
    'comp.rest.restAccessor',
    'xcore.auth_settings_arry',
    'xcore.auth_settings_map'
  ];
  function authorityService($log, $q, $rootScope, restAccessor, authSettingsArry, authSettingsMap) {

    var isAuthorityInitialized = false;
    /** verb+' '+uri_pattern -> resource obj */
    var vupResourceMapping;
    /** resourceId -> resource obj */
    var idResourceMapping;

    // initialize authority map
    //_init();


    var fullAuthorities = authSettingsArry;

    return {

      getFullAuthorities: getFullAuthorities,
      filterAuthoritiesWithResourceIds: filterAuthoritiesWithResourceIds,
      filterAuthCodesWithResourceIds: filterAuthCodesWithResourceIds,
      getAuthorityWithCode: getAuthorityWithCode,
      getResourceIdsWithAuthCodes: getResourceIdsWithAuthCodes,
      obtainResourceIdWithVerbUri: obtainResourceIdWithVerbUri,
      init: init

    };

    function filterAuthCodesWithResourceIds(resourceIds) {

      if (!isAuthorityInitialized) {
        throw 'authorityService not initialized';
      }

      var authenticatedCodeArry = [];

      for (var code in authSettingsMap) {
        if (authSettingsMap.hasOwnProperty(code)) {
          var dependencies = null;
          if (authSettingsMap[code].entry_dependencies) {
            dependencies = authSettingsMap[code].entry_dependencies;
          } else if (authSettingsMap[code].dependencies) {
            dependencies = authSettingsMap[code].dependencies;
          } else {
            continue;
          }

          var depSatisfied = true;
          for (var i = 0; i < dependencies.length; i++) {
            var satisfied = false;
            for (var j = 0; j < resourceIds.length; j++) {
              if (!vupResourceMapping[dependencies[i]]) {
                $log.warn('[ ' + dependencies[i] + ' ] is not security resource on server');
                satisfied = true;
                break;
              }else if (vupResourceMapping[dependencies[i]].id == resourceIds[j]) {

                satisfied = true;
                break;
              }
            }
            if (!satisfied) {
              depSatisfied = false;
              break;
            }
          }

          if (depSatisfied) {
            authenticatedCodeArry.push(code);
          }

        }
      }

      return authenticatedCodeArry;

    }


    /**
     * 根据传入的资源标识符列表, 过滤权限信息
     *
     * @param resourceIds {Array}
     *
     * @return {Array}
     */
    function filterAuthoritiesWithResourceIds(resourceIds) {

      if (!isAuthorityInitialized) {
        throw 'authorityService not initialized';
      }

      var authArry = [];
      var authenticatedCodeArry = filterAuthCodesWithResourceIds(resourceIds);

      recursiveFilterAuthData(fullAuthorities, authArry, authenticatedCodeArry);
      return authArry;

    }

    /**
     * 获取完整的权限信息, 包括了菜单 和 事件(如按钮点击)
     *
     * @returns {Array}
     */
    function getFullAuthorities() {

      return fullAuthorities;

    }

    /**
     * 根据传入的菜单编码获取权限对象
     *
     * @param code
     * @return {Object}
     */
    function getAuthorityWithCode(code) {

      return authSettingsMap[code];

    }

    /**
     * Retrieve resource ids against with the given authority codes
     *
     * @param codes
     * @return [123, 321, 4411, ...]
     */
    function getResourceIdsWithAuthCodes(codes) {

      if (!isAuthorityInitialized) {
        throw 'authorityService not initialized';
      }

      if (!codes) {
        return [];
      }

      var authSetMap = {};
      for (var i = 0; i < codes.length; i++) {
        var authEntry = authSettingsMap[codes[i]];
        var depResources;
        if (authEntry.entry_dependencies) {
          depResources = authEntry.entry_dependencies;
        } else if (authEntry.dependencies) {
          depResources = authEntry.dependencies;
        }
        if (depResources) {
          for (var j = 0; j < depResources.length; j++) {
            authSetMap[depResources[j]] = true;
          }
        }
      }

      var ret = [];
      for (var uriWithVerb in authSetMap) {
        if (authSetMap.hasOwnProperty(uriWithVerb) && authSetMap[uriWithVerb]) {
          ret.push(obtainResourceIdWithVerbUri(uriWithVerb));
        }
      }

      return ret;

    }


    function obtainResourceIdWithVerbUri(uriWithVerb) {

      if (!isAuthorityInitialized) {
        throw 'authorityService not initialized';
      }

      return vupResourceMapping[uriWithVerb];

    }

    function recursiveFilterAuthData(originArry, filterArry, authCodeArry) {

      if (!isAuthorityInitialized) {
        throw 'authorityService not initialized';
      }

      if (!originArry || originArry.length == 0) {
        return;
      }

      for (var i = 0; i < originArry.length; i++) {
        var originEntry = originArry[i];
        if (!_checkAuthCode(authCodeArry, originEntry.code)) {
          continue;
        }
        if (originEntry.sub_menus) {
          var newSubMenus = [];
          recursiveFilterAuthData(originEntry.sub_menus, newSubMenus, authCodeArry);
          var newEntry = {
            code: originEntry.code,
            name: originEntry.name,
            icon: originEntry.icon,
            order: originEntry.order,
            sub_menus: newSubMenus
          };
          filterArry.push(newEntry);
        } else if (originEntry.entry_dependencies) {
          var newEntryEvents = [];
          recursiveFilterAuthData(originEntry.events, newEntryEvents, authCodeArry);
          var newEntry = {
            code: originEntry.code,
            name: originEntry.name,
            icon: originEntry.icon,
            order: originEntry.order,
            entry_dependencies: originEntry.entry_dependencies,
            resource_ids: originEntry.resource_ids,
            events: newEntryEvents
          };
          filterArry.push(newEntry);
        } else if (originEntry.dependencies) {
          filterArry.push({
            code: originEntry.code,
            name: originEntry.name,
            dependencies: originEntry.dependencies,
            resource_ids: originEntry.resource_ids,
          });
        }
      }



    }

    function _checkAuthCode(authCodeArry, code) {
      for (var i = 0; i < authCodeArry.length; i++) {
        if (authCodeArry[i].indexOf(code) >= 0) {
          return true;
        }
      }
      return false;
    }


    function _processAuthArryEntry(authArry, callback) {
      if (!authArry) {
        return;
      }

      for (var i = 0; i < authArry.length; i++) {
        var entry = authArry[i];
        callback(entry);
        if (entry.sub_menus) {
          _processAuthArryEntry(entry.sub_menus, callback);
        } else if (entry.events) {
          _processAuthArryEntry(entry.events, callback);
        }
      }
    }


    function init() {
      return restAccessor.get('/system/resources', null, {infinite_count: true}).then(
        function(response) {
          vupResourceMapping = {};
          idResourceMapping = {};
          for (var i = 0; i < response.data.length; i++) {
            var resourceEntry = response.data[i];
            vupResourceMapping[resourceEntry.verb + ' ' + resourceEntry.uri_pattern] = resourceEntry;
            idResourceMapping[resourceEntry.id] = resourceEntry;
          }

          // 遍历 arry, 把所有带有 依赖的 节点,添加一个 resource_ids 属性
          _processAuthArryEntry(authSettingsArry, function(entry) {
            var vupDeps = null;
            if (entry.entry_dependencies) {
              vupDeps = entry.entry_dependencies;
            } else if (entry.dependencies) {
              vupDeps = entry.dependencies;
            } else {
              return;
            }
            var resourceIds = [];
            for (var i = 0; i < vupDeps.length; i++) {
              if (!vupResourceMapping[vupDeps[i]]) {
                $log.warn('unrecognized vup[' + vupDeps[i] + ']');
              } else {
                resourceIds.push(vupResourceMapping[vupDeps[i]].id);
              }
            }
            entry.resource_ids = resourceIds;
          });

          isAuthorityInitialized = true;
        },
        function(errResponse) {
          throw errResponse.data.message;
        }
      );
    }

  }

})();
