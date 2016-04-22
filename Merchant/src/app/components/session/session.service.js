(function() {
  'use strict';

  angular
    .module('xcore.comp')
    .constant('comp.session.sessionService.constant', {

      COOKIE_KEY_AUTH_TOKEN: 'AUTHTOKEN'

    })
    .factory('comp.session.sessionService', sessionService);

  sessionService.$inject = [
    '$log',
    '$rootScope',
    '$q',
    'comp.session.sessionService.constant',
    'comp.rest.restAccessor',
    'comp.auth.authorityService'
  ];
  function sessionService($log, $rootScope, $q, constant,  restAccessor, authorityService) {

    // 缓存的会话信息
    var session = null;
    var authorizedCodes = null;

    return {

      getToken: getToken,
      syncSession: syncSession,
      getSessionFromCache: getSessionFromCache,
      createSession: createSession,
      destroySession: destroySession,
      modifyCredential: modifyCredential,
      hasAuthority: hasAuthority

    };

    /**
     * 获取缓存会话中的令牌.
     * 若缓存会话中不存在,则去 cookie 中获取.
     *
     * @return {String}
     */
    function getToken() {

      if (session) {
        return session.token;
      }

      return Cookies.get(constant.COOKIE_KEY_AUTH_TOKEN);

    }

    function getSessionFromCache() {
      return session;
    }

    /**
     * 创建会话
     *
     * @param loginName
     * @param password
     * @param domainCode
     * @return {Promise}
     *  resolve: {AuthenticationObject}
     *  reject: message
     */
    function createSession(loginName, password, domainCode) {

      return restAccessor.post('/system/session', null, {
          loginId: loginName,
          password: password
      }).then(
        function(response) {
          Cookies.set(constant.COOKIE_KEY_AUTH_TOKEN, response.data.token);
          console.log("data="+response.data);
          session = response.data;
          $rootScope.session = session;
          return response.data;
        },
        function(errResponse) {
          console.error("data="+errResponse.data.message);
          return $q.reject(errResponse.data.message);
        }
      );

    }

    /**
     * 从后台同步会话至缓存
     *
     * @returns {Promise}
     *  resolve: {session}
     *  reject: message
       */
    function syncSession() {
      return restAccessor.get('/system/session').then(
        function(response) {
          session = response.data;
          $rootScope.session = session;
          return session;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );

    }

    /**
     * 销毁会话
     *
     * @returns {*}
       */
    function destroySession() {
      return restAccessor.delete('/system/session').then(
        function() {
          session = null;
          $rootScope.session = null;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     *
     *
     */
    function modifyCredential(originPassword, newPassword) {
      return restAccessor.put('/system/session/credential', null, {
        origin_password: originPassword,
        new_password: newPassword
      }).then(
        function() {},
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }


    function hasAuthority(code) {
      if (!authorizedCodes) {
        var resourceIds = [];
        if (!session) {
          throw 'session not initialized in cache';
        }
        for (var i = 0; i < session.resources.length; i++) {
          resourceIds.push(session.resources[i].id);
        }
        authorizedCodes = authorityService.filterAuthCodesWithResourceIds(resourceIds);
      }

      for (var i = 0; i < authorizedCodes.length; i++) {
        if (code == authorizedCodes[i]) {
          return true;
        }
      }
      return false;
    }
  }

})();
