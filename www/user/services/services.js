angular.module('main.user')
  .factory('ngUser',['$log', 'Appuser', 'User', 'Checkcode', 'LoopBackAuth', 'MainService', '$rootScope', NgUser])

function NgUser($log, Appuser, User, Checkcode, LoopBackAuth, MainService, $rootScope){
    var userInfo = {
        username: '',
        phoneNumber: '',
        verificationCode: ''
    }

    return {
        getVerificationCode: getVerificationCode,
        loginByPassword: loginByPassword,
        validateIdNumber: validateIdNumber,
        validateMobile: validateMobile,
        validateCheckCode: validateCheckCode,
        validatePassword: validatePassword,
        isLogin: isLogin,
        signUp: signUp,
        setPhoneNumber: setPhoneNumber,
        setVerificationCode: setVerificationCode,
        setUserInfo: setUserInfo,
        getUserInfo: getUserInfo,
        getCouponList: getCouponList,
        getHelpList: getHelpList,
        setFranchisee: setFranchisee,
        getFranchisee: getFranchisee,
        resetPassword: resetPassword,
        updatePassword: updatePassword,
        initJPush2Use: initJPush2Use,
        stopJPush: stopJPush
    };

    function getVerificationCode(mobile, successCb, errorCb) {
        $log.debug('mobile: ' + mobile);
        Checkcode.getVerifyCode(mobile, function (res) {
            $log.debug('getVerificationCode result :' + JSON.stringify(res));
            if (successCb) {
                return successCb(res);
            }
        }, function (err) {
            $log.debug('Unable to getVerificationCode:' + JSON.stringify(err));
            if (errorCb) {
                return errorCb('GET_VERIFICATION_CODE_ERROR');
            }
        });
    }

    function loginByPassword(mobile, password, successCb, errorCb) {
        if (LbUser.isAuthenticated()) {
            if (errorCb) {
                errorCb(new Error('Already Logged-in. Please logout first!'));
            }
            return;
        }
        franchisee.login({
            mobile: mobile,
            password: password
        }, function (accessToken) {
            $log.debug('loginByPassword accessToken :' + JSON.stringify(accessToken));

            LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
            LoopBackAuth.rememberMe = true;
            LoopBackAuth.save();
            setUserInfo(function () {
                $log.debug('accessToken.id: ' + accessToken.id + '; accessToken.userId: ' + accessToken.userId + '; LoopBackAuth.currentUserId: ' + LoopBackAuth.currentUserId);
                if (successCb) {
                    return successCb(accessToken);
                }
            });
        }, function (err) {
            $log.debug('Unable to loginByPassword:' + err);
            if (errorCb) {
                return errorCb(err);
            }
        });
    }


    function validatePassword(password, successCb, errorCb) {
        if (!password || password === '') {
            errorCb('请输入密码');
            return;
        } else if (password.length < 6) {
            errorCb('密码过短');
            return;
        }
        // var regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        // if (!regex.test(password)) {
        //   errorCb('密码必须包含数字与字母');
        //   return;
        // }
        successCb();
    }

    function validateIdNumber(idNumber, successCb, errorCb) {
        var regex = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
        if (idNumber.length === 15) {
            regex = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
        }
        if (regex.test(idNumber)) {
            successCb();
        } else {
            errorCb();
            return;
        }
    }

    //1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束
    function validateMobile(mobile, successCb, errorCb) {
        var regex = /^0?(13[0-9]|15[0-9]|17[0135678]|18[0-9]|14[57])[0-9]{8}$/;
        if (regex.test(mobile)) {
            successCb();
        } else {
            errorCb();
            return;
        }
    }

    //4位数字
    function validateCheckCode(mobile, successCb, errorCb) {
        var regex = /^\d{4}$/;
        if (regex.test(mobile)) {
            successCb();
        } else {
            errorCb();
        }
    }

    /**
     * 判断当前是否有用户登录
     * @return {Boolean} true－已经登录；false－未登录
     */
    function isLogin() {
        return LbUser.isAuthenticated();
    }

    /**
     * 获取当前登录用户信息
     * @return {Object} 当前用户数据
     */
    function getCurrentUser() {
        return LoopBackAuth.currentUserData;
    }

    function signUp(signData, successCb, errorCb) {
        franchisee.signup(signData, function (res) {
            $log.debug('signUp result :' + JSON.stringify(res));
            if (successCb) {
                return successCb(res);
            }
        }, function (err) {
            $log.debug('Unable to signUp:' + JSON.stringify(err));
            if (errorCb) {
                return errorCb(err);
            }
        });
    }

    function setPhoneNumber(phoneNumber) {
        userInfo.phoneNumber = phoneNumber;
    }

    function setVerificationCode(verificationCode) {
        userInfo.verificationCode = verificationCode;
    }

    function setUserInfo(callback) {
        setFranchisee(function () {
            if (LoopBackAuth.currentUserData) {
                MainService.setLocalStorage('currentUserData', LoopBackAuth.currentUserData);
            }
            return callback();
        });
    }

    function getUserInfo() {
        var currentUserData = MainService.getLocalStorage('current.franchisee');
        if (currentUserData) {
            currentUserData = JSON.parse(currentUserData);
            if (currentUserData.userId) {
                return currentUserData;
            } else {
                $rootScope.jump('user.login');
                return;
            }
        } else {
            $rootScope.jump('user.login');
            return;
        }
    }

    function getCouponList() {
    }

    function getHelpList() {
    }

    function setFranchisee(successCb, errorCb) {
        var userId = LoopBackAuth.currentUserId;
        if (userId) {
            LbUser.franchisee({id: userId}, function (res) {
                MainService.setLocalStorage('current.franchisee', res);
                if (successCb) {
                    successCb(res);
                }
            }, function () {
                if (errorCb) {
                    errorCb();
                }
            });
        }
    }

    function getFranchisee(successCb, errorCb) {
        var currentFranchisee = MainService.getLocalStorage('current.franchisee');
        if (currentFranchisee) {
            currentFranchisee = JSON.parse(currentFranchisee);
            successCb(currentFranchisee);
        } else {
            setFranchisee(successCb, errorCb);
        }
    }

    function resetPassword(resetData, successCb, errorCb) {
        franchisee.resetPasswordByMobile(resetData, function (res) {
            if (successCb) {
                successCb(res);
            }
        }, function (err) {
            if (errorCb) {
                errorCb(err);
            }
        });
    }

    function updatePassword(userId, password, successCb, errorCb) {
        franchisee.prototype$modifyPassword({id: userId}, password, function (res) {
            if (successCb) {
                successCb(res);
            }
        }, function (err) {
            if (errorCb) {
                errorCb(err);
            }
        });
    }

    function removeJPushListener() {
        // window.plugins.jPushPlugin.stopPush();
        document.removeEventListener('jpush.receiveNotification', onReceiveNotification, false);
        document.removeEventListener('jpush.setTagsWithAlias', onTagsWithAlias, false);
        document.removeEventListener('jpush.openNotification', onOpenNotification, false);
        document.removeEventListener('jpush.receiveMessage', onReceiveMessage, false);
    }

    // Mpush
    function stopJPush() {
        //设置tags为空
        window.plugins.jPushPlugin.setTagsWithAlias([], '');
        // window.plugins.jPushPlugin.stopPush();
        document.removeEventListener('jpush.receiveNotification', onReceiveNotification, false);
        document.removeEventListener('jpush.setTagsWithAlias', onTagsWithAlias, false);
        document.removeEventListener('jpush.openNotification', onOpenNotification, false);
        document.removeEventListener('jpush.receiveMessage', onReceiveMessage, false);
    }

    // jPush 监听通知回调
    function onReceiveNotification(event) {
        console.log('onReceiveNotification');
        try {
            var alert, title;
            if (ionic.Platform.isAndroid()) {
                alert = event.alert;
                title = event.title;
            } else {
                alert = event.aps.alert;
                title = event.aps.title;
            }

            var notificationArray = MainService.getLocalStorage('Notificaiton');
            if (notificationArray === undefined || notificationArray === null || notificationArray === '') {
                notificationArray = []
            } else {
                notificationArray = JSON.parse(notificationArray);
                ngMessage.notificaiton.msg = notificationArray;
            }

            var d = new Date();
            var yyyy = d.getFullYear();
            var MM = d.getMonth() + 1;
            var dd = d.getDate();
            var hh = d.getHours();
            var mm = d.getMinutes();
            var timeStr = yyyy + '-' + setNumber(MM) + '-' + setNumber(dd) + ' ' + setNumber(hh) + ':' + setNumber(mm);

            notificationArray.push({'createTime': timeStr, 'title': title, 'content': alert, 'checked': false});
            notificationArray = quickSort(notificationArray);
            MainService.setLocalStorage('Notificaiton', JSON.stringify(notificationArray));
            $log.debug('JPushPlugin:onReceiveNotification: ' + alert);
        } catch (exception) {
            console.log(exception);
        }
    }

    function quickSort(array) {
        var i = 0;
        var j = array.length - 1;
        var Sort = function (i, j) {
            // 结束条件
            if (i === j) {
                return
            }

            var key = array[i];
            var stepi = i; // 记录开始位置
            var stepj = j; // 记录结束位置
            while (j > i) {
                // j <<-------------- 向前查找
                if (array[j].createTime <= key.createTime) {
                    j--;
                } else {
                    array[i] = array[j]
                    //i++ ------------>>向后查找
                    while (j > ++i) {
                        if (array[i].createTime < key.createTime) {
                            array[j] = array[i];
                            break;
                        }
                    }
                }
            }

            // 如果第一个取出的 key 是最小的数
            if (stepi === i) {
                Sort(++i, stepj);
                return;
            }

            // 最后一个空位留给 key
            array[i] = key;

            // 递归
            Sort(stepi, i);
            Sort(j, stepj);
        }
        Sort(i, j);
        return array;
    }

    function setNumber(val) {
        return (val < 10 ? ('0' + val) : val);
    }

    // jPush 设置tags和alias回调
    function onTagsWithAlias(event) {
        try {
            var result = 'result code: ' + event.resultCode + ' ';
            result += 'tags:' + event.tags + ' ';
            result += 'alias:' + event.alias + ' ';
            $log.debug('JPushPlugin:onTagsWithAlias:' + result);
        } catch (exception) {
            $log.debug(exception);
        }
    }

    // jPush 监听打开通知的回调:
    function onOpenNotification() {
        // var dataEvent = JSON.stringify(event);
        // console.log('onOpenNotification : ' + dataEvent + ' -- ' + event);
        $rootScope.jump('message');
    }

    var setTagsWithAliasTimer;

    function setTagsWithAlias(userId, tokenId) {
        try {
            //设置tags 和 alias
            window.plugins.jPushPlugin.setTagsWithAlias([], userId);
            $log.debug('JPushPlugin setTagsWithAlias userId: ' + userId + ', tokenId : ' + tokenId);
        } catch (exception) {
            $log.debug('JPushPlugin setTagsWithAlias exception: ' + exception);
        }
    }

    function clearTimeoutSetTagsWithAliasTimer() {
        if (setTagsWithAliasTimer) {
            clearTimeout(setTagsWithAliasTimer);
        }
    }

    function setTagsWithAliasTimerFuc(userId, tokenId) {
        clearTimeoutSetTagsWithAliasTimer();

        setTagsWithAliasTimer = setTimeout(function () {
            initJPush2Use();
        }, 60 * 1000);
        setTagsWithAlias(userId, tokenId);
    }

    // jPush 监听消息回调:
    function onReceiveMessage(event) {
        console.log('onReceiveMessage' + event);
        try {
            var message;
            if (ionic.Platform.isAndroid()) {
                message = event.message;
            } else {
                message = event.content;
            }
            $log.debug('JPushPlugin:onReceiveMessage: ' + message);
        } catch (exception) {
            $log.debug('JPushPlugin:onReceiveMessage-->' + exception);
        }
    }

    function initJPush2Use() {
        if (isLogin()) {
            setTimeout(function () {
                getCurrentUser();
                removeJPushListener();
                addJPushListener();
                $log.debug('LoopBackAuth.currentUserId' + LoopBackAuth.currentUserId);
                initJPush(LoopBackAuth.currentUserId, LoopBackAuth.accessTokenId);
            }, 3000);
        }
    }

    function initJPush(userId, tokenId) {
        if (window.plugins) {
            //初始化jPush
            window.plugins.jPushPlugin.setDebugMode(true);
            window.plugins.jPushPlugin.init();

            window.plugins.jPushPlugin.isPushStopped(function (success) {
                $log.debug('JPushPlugin initJPush isPushStopped success: ' + success);
                if (success === 1) {
                    $log.debug('JPushPlugin initJPush resumePush!!!');
                    window.plugins.jPushPlugin.resumePush();
                }
            });

            window.plugins.jPushPlugin.getRegistrationID(function (data) {
                try {
                    $log.debug('JPushPlugin registrationID is ' + data);
                    setTagsWithAliasTimerFuc(userId, tokenId);
                } catch (exception) {
                    $log.debug(exception);
                }
            });
        }

        //初始化jPush
        // try {
        //   window.plugins.jPushPlugin.init();
        //   window.plugins.jPushPlugin.setDebugMode(true);
        //   window.plugins.jPushPlugin.getRegistrationID(function (data) {
        //     $log.debug('JPushPlugin:registrationID is ' + data);
        //   });
        // } catch (exception) {
        //   $log.debug(exception);
        // }
        //
        // try {
        //   //设置tags 和 alias
        //   window.plugins.jPushPlugin.setTagsWithAlias([], userId);
        //   $log.debug(userId + ', tokenId : ' + tokenId);
        // } catch (exception) {
        //   console.log(exception);
        //   alert(exception);
        // }

    }

    function addJPushListener() {
        document.addEventListener('jpush.receiveNotification', onReceiveNotification, false);
        document.addEventListener('jpush.setTagsWithAlias', onTagsWithAlias, false);
        document.addEventListener('jpush.openNotification', onOpenNotification, false);
        document.addEventListener('jpush.receiveMessage', onReceiveMessage, false);
    }

    console.log("NgUser")
    return "0"
}
//angular.module('starter.services', [])
//
//.factory('Chats', function() {
//  // Might use a resource here that returns a JSON array
//
//  // Some fake testing data
//  var chats = [{
//    id: 0,
//    name: 'Ben Sparrow',
//    lastText: 'You on your way?',
//    face: 'img/ben.png'
//  }, {
//    id: 1,
//    name: 'Max Lynx',
//    lastText: 'Hey, it\'s me',
//    face: 'img/max.png'
//  }, {
//    id: 2,
//    name: 'Adam Bradleyson',
//    lastText: 'I should buy a boat',
//    face: 'img/adam.jpg'
//  }, {
//    id: 3,
//    name: 'Perry Governor',
//    lastText: 'Look at my mukluks!',
//    face: 'img/perry.png'
//  }, {
//    id: 4,
//    name: 'Mike Harrington',
//    lastText: 'This is wicked good ice cream.',
//    face: 'img/mike.png'
//  }];
//
//  return {
//    all: function() {
//      return chats;
//    },
//    remove: function(chat) {
//      chats.splice(chats.indexOf(chat), 1);
//    },
//    get: function(chatId) {
//      for (var i = 0; i < chats.length; i++) {
//        if (chats[i].id === parseInt(chatId)) {
//          return chats[i];
//        }
//      }
//      return null;
//    }
//  };
//});
