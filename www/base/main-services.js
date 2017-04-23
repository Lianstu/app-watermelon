/**
 * Created by lianshaoshuai on 17/4/21.
 */
angular
  .module('main.service', ['main'])
  .factory("MainService",['$log', '$window', '$cordovaDialogs', '$rootScope', '$cordovaGeolocation', 'User', 'LoopBackAuth', '$ionicLoading', '$ionicDeploy', '$cordovaFileTransfer', '$cordovaFileOpener2', mainService])

function mainService($log, $window, $cordovaDialogs, $rootScope, $cordovaGeolocation, User, LoopBackAuth,  $ionicLoading, $ionicDeploy, $cordovaFileTransfer, $cordovaFileOpener2){

  return {
    alertMsg: alertMsg,
    confirmMsg: confirmMsg,
    setLocalStorage: setLocalStorage,
    getLocalStorage: getLocalStorage,
    removeLocalStorage: removeLocalStorage,
    logout: logout,
    logout2: logout2
  };
  function alertMsg(title, message, button, successCb) {
    button = button ? button : '确定';
    $cordovaDialogs.alert(message, title, button).then(function () {
      if (successCb) {
        return successCb();
      }
    });
  }

  function getConfirmMsg() {
    return showconfirmMsg;
  }

  function setConfirmMsg(value) {
    showconfirmMsg = value;
  }


  function confirmMsg(title, message, buttonArray, successCb) {
    buttonArray = buttonArray ? buttonArray : ['确定', '取消'];
    $cordovaDialogs.confirm(message, title, buttonArray).then(function (buttonIndex) {
      if (buttonIndex === 1) {
        if (successCb) {
          return successCb(buttonIndex);
        }
      }
    });
  }
  //做本地存储
  function setLocalStorage(key, value) {
    if (value) {
      if (typeof(value) === 'object') {
        value = JSON.stringify(value);
      }
    }
    $window.localStorage[key] = value;
  }

  function clearLocalStorage() {
    $window.localStorage.clear();
  }

  function getLocalStorage(key, defaultValue) {
    return $window.localStorage[key] || defaultValue;
  }

  function removeLocalStorage(key) {
    return $window.localStorage.removeItem(key);
  }
  //退出
  function logout(successCb) {
    User.logout(function () {
      if (window.plugins) {
        window.plugins.jPushPlugin.stopPush();
      }
      clearLocalStorage();
      successCb();
    });
  }
  function logout2(successCb) {
    if (window.plugins) {
      window.plugins.jPushPlugin.stopPush();
    }
    LoopBackAuth.clearUser();
    LoopBackAuth.clearStorage();
    clearLocalStorage();
    successCb();
  }
}
