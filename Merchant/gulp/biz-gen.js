/**
 * this gulp script is for:
 * 1. generate the authority settings >> xcore.auth.settings.js
 * 2. add dependencies of business module to xcore.main.module.js
 */

'use strict';

var path = require('path');
var gulp = require('gulp');
var fs = require('fs');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();



gulp.task('biz-gen', function() {

  var settingsMap = {};
  var pathKeyArry = [];
  var settingsArry = [];

  walk(path.join(conf.paths.src, '/app/business'), function(pathname) {

    // find all settings.json under /app/business
    if (pathname.indexOf('settings.json') != (pathname.length - 'settings.json'.length)) {
      return;
    }

    // if path is '/src/app/business/auth/user'
    // then pathKey = auth.user
    console.log('processing ' + pathname);
    var pathKey = pathname.substring(
        (conf.paths.src + '/app/business').length + 1,
        pathname.length - 'settings.json'.length - 1)
      .replace(eval('/\\' + path.sep + "/g"), '.');
    pathKeyArry.push(pathKey);

    // read the settings.json content and parse it to json object
    var contents = fs.readFileSync(pathname);
    var jsonMap = JSON.parse(contents);
    jsonMap['code'] = pathKey;

    // put the json object to map
    settingsMap[pathKey] = jsonMap;

  });

  // convert map to top-level module array, each top-level module is still a unlimite-level map
  pathKeyArry.sort();
  for (var i = 0; i < pathKeyArry.length; i++) {
    var pathKey = pathKeyArry[i];
    if (pathKey.indexOf('.') == -1) {
      settingsArry.push(settingsMap[pathKey]);
    } else {
      var parentMenu = settingsMap[pathKey.substring(0, pathKey.lastIndexOf('.'))];
      if (!parentMenu.sub_menus) {
        parentMenu.sub_menus = [];
      }
      parentMenu.sub_menus.push(settingsMap[pathKey]);

      if (settingsMap[pathKey].events) {
        for (var j = 0; j < settingsMap[pathKey].events.length; j++) {
          var eventKey = pathKey + '.' + settingsMap[pathKey].events[j].code;
          settingsMap[pathKey].events[j].code = eventKey;
          settingsMap[eventKey] = settingsMap[pathKey].events[j];
        }
      }

    }
  }

  // sort the top-level module array by its order property
  recursiveSort(settingsArry);


  // generating authority datas
  var settingsMapLiteral = JSON.stringify(settingsMap);
  var settingsArryLiteral = JSON.stringify(settingsArry);

  var appSettingsConstantsFilePath = conf.paths.src + '/app/xcore.auth.settings.js';
  if(fs.existsSync(appSettingsConstantsFilePath)){
    fs.unlinkSync(appSettingsConstantsFilePath);
  }

  fs.writeFileSync(appSettingsConstantsFilePath,
    authTemplate().replace('${settingsMapLiteral}', settingsMapLiteral).replace('${settingsArryLiteral}', settingsArryLiteral));
  console.log('generating ' + appSettingsConstantsFilePath);

  // add dependencies of business module to main.module.js
  var mainModuleFilePath = conf.paths.src + '/app/main/main.module.js';
  var mainModuleContent = fs.readFileSync(mainModuleFilePath, 'UTF-8');
  var depList = [];
  for (var i = 0; i < settingsArry.length; i++) {
    depList[depList.length] = "'xcore.biz." + settingsArry[i].code + "'";
  }

  mainModuleContent = mainModuleContent.replace(/\/\*\*\/.*\/\*\*\//,'/**/[' + depList.join(',') + ']/**/');
  if(fs.existsSync(mainModuleFilePath)){
    fs.unlinkSync(mainModuleFilePath);
  }
  fs.writeFileSync(mainModuleFilePath, mainModuleContent);
  console.log('modifying ' + mainModuleFilePath);


});

function recursiveSort(menus) {

  menus.sort(function(a, b) {
    return a.order - b.order;
  });

  for (var i = 0; i < menus.length; i++) {
    if (menus[i].sub_menus) {
      recursiveSort(menus[i].sub_menus);
    }
  }

}

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      walk(pathname, callback);
    }  else {
      callback(pathname);
    }
  });
}

function authTemplate() {
  return "(function() {\n\
  'use strict';\n\
  angular.module('xcore')\n\
  .constant('xcore.auth_settings_map', ${settingsMapLiteral})\n\
  .constant('xcore.auth_settings_arry', ${settingsArryLiteral});\n\
  })();";
}
