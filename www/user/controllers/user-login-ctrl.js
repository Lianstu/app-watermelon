angular
  .module('main.user')
  .controller('LoginCtrl', ['$log', '$ionicHistory', '$scope', '$interval', '$state', '$stateParams', 'ngUser', 'MainService',LoginCtrl])

function LoginCtrl($log, $ionicHistory, $scope, $interval, $state, $stateParams, ngUser, MainService) {
  console.log("hello LoginCtrl ")
  var self = this;
  self.loginByPassword = loginByPassword;
  ngUser.initJPush2Use();

  $scope.views = {
    mobile: '',
    password: ''
  }

  function loginByPassword() {
    ngUser.validateMobile($scope.views.mobile,function(){//验证手机号成功逻辑
      ngUser.validatePassword($scope.views.password,function(){//验证密码是否为空以及少于六位
        var tel = $scope.views.mobile;
        var pwd = $scope.views.password;
        ngUser.loginByPassword(tel,pwd,function(accessToken){//登录成功处理
          //处理跳转
          $log.debug('**LoginCtrl**isLogin:' + ngUser.isLogin());
          //angular.element('input').blur();
          if (ngUser.isLogin()) {//登录成功
            //todo
            //这个地方需要对socket做初始化;
            //做页面跳转
            $state.go('home');
            //ngUser.initJPush2Use();//对推送做初始化
            //if ($stateParams.paramNext) {
            //  $ionicHistory.currentView($ionicHistory.clearHistory());
            //  $state.go($stateParams.paramNext);
            //} else {
            //  if ($ionicHistory.backView()) {
            //    $ionicHistory.goBack();
            //  } else {
            //
            //  }
            //}
          }else{
            console.log("")
            MainService.alertMsg('登录失败，请重新尝试');
          }
        },function(err){//登录成功处理录成功处理
          //处理err

          console.log(" login - ctrl - ngUser.loginByPassword err",err)
        })
      },function(err){
        console.log("请输入正确格式的密码",err)
        //MainService.alertMsg("请输入正确密码")
      })
    },function(){
      console.log("请输入正确的手机号码")
      MainService.alertMsg("请输入正确的手机号码")
    })
    console.log("hello loginByPassword ",$scope.views)
  }
}
