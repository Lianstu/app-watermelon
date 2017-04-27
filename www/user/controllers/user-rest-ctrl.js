/**
 * Created by aye on 08/02/2017.
 */
'use strict';
angular
  .module('main.user')
  .controller('RestCtrl', ['$log', '$state', '$scope', '$rootScope', '$stateParams', '$ionicHistory', '$interval', 'ngUser', 'MainService', UserRestCtrl]);

function UserRestCtrl ($log, $state, $scope, $rootScope, $stateParams, $ionicHistory, $interval, ngUser, MainService) {
  console.log("hello UserRestCtrl ")
  var self = this;
  self.resetPassword = resetPassword;
  self.getVerificationCode = getVerificationCode;

  var sec = 0,
    countDown = null;

  $scope.views = {
    verificationCodeText: '获取验证码',
    mobile: '',
    verificationCode: '',
    password: '',
    passwdSure: ''
  };
  function resetPassword() {
    console.log("resetPassword")
    ngUser.validateMobile($scope.views.mobile,function(){//验证手机号正确
      ngUser.validatePassword($scope.views.password,function(){//验证密码成功
        if($scope.views.password != $scope.views.passwdSure){
          MainService.alertMsg("两次输入密码不一致")
        }else{//做数据库交互
          ngUser.resetPassword($scope.views,function(res){
            //todo提示更改成功跳转到登录页面
            console.log("resetPassword_res",res)
            if(res == "ok"){
              MainService.alertMsg("更改密码成功,请重新登录")
              $state.go("user.login");
            }else {
              MainService.alertMsg("更改密码失败")
            }
          },function(err){
            MainService.alertMsg("err:"+err)
          })
        }
      },function(err){//验证密码

      })
    },function(){//验证手机号正确
      MainService.alertMsg("请输入正确手机号")
    })
  }

  function getVerificationCode() {
    console.log("getVerificationCode")
    //第一步验证码手机号
    var tel = $scope.views.mobile;
    console.log("tel",tel)
    ngUser.validateMobile(tel,function(){//验证手机号格式正确
      if(sec > 0){
        MainService.alertMsg('已发送验证码请勿重复点击');
      }else{
        //第二步对手机号做验证
        ngUser.getVerificationCode(tel,function(res){//成功获取验证码
          $log.debug("getVerificationCode",JSON.stringify(res))
          if(res.code){
            //设置倒计时
            sec = 59;
            time = $interval(function(){
              if(sec == 0){//为0时清除定时器,设置button文本
                $scope.views.verificationCodeText = "重试获取"
                $interval.cancel(time)
              }else{
                sec = sec - 1;
                console.log("getVerificationCode_sec",sec)
                $scope.views.verificationCodeText = sec+"秒后重试"
              }
            },1000)
          }
        },function(err){
          MainService.alertMsg('获取验证码错误')
        })
      }
    },function(){
      MainService.alertMsg('请输入正确手机号')
    })
  }
}
