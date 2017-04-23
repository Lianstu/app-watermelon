angular
  .module('main.user')
  .controller('JoinCtrl', ['$log', '$ionicHistory', '$scope', '$interval', '$state', '$stateParams', 'ngUser', 'MainService',JoinCtrl])

function JoinCtrl($log, $ionicHistory, $scope, $interval, $state, $stateParams, ngUser, MainService) {
  console.log("hello JoinCtrl ")
  var self = this;
  self.joinByMobile = joinByMobile;
  self.getVerificationCode = getVerificationCode
  //ngUser.initJPush2Use();
  var sec = 0;//
  var time = null;
  $scope.views = {
    name : '',
    verificationCodeText: '获取验证码',
    verificationCode:"",
    mobile: '',
    password: '',
    passwdSure: ''
  }

  function joinByMobile() {
    var tel = $scope.views.mobile;
    var pwd = $scope.views.password;
    var pwdsure = $scope.views.passwdSure;
    if($scope.views.name == ""){
      MainService.alertMsg("请输入昵称")
    }else{
      ngUser.validateMobile(tel,function(){//1.验证手机号成功
        ngUser.validatePassword(pwd,function(){//2.验证密码成功
          if(pwd != pwdsure ){
            MainService.alertMsg("两次密码输入不一样")
          }else{//3.提交数据
            var userInfo;
            userInfo.mobile = tel;
            userInfo.password = pwd;
            userInfo.code = $scope.views.verificationCode;
            userInfo.nickname = $scope.views.name;
            ngUser.signUp(userInfo,function(res){//4.注册
              if(res){
                //注册成功就跳转到login中
                console.log("ngUser.signUp_success",res)
                MainService.alertMsg("注册成功,请登录")
                $state.go('user.login')
              }
            },function(err){
              console.log("ngUser.signUp_faile",err)
              MainService.alertMsg(""+err)
            })
          }
        },function(err){//验证密码失败
          MainService.alertMsg(""+err)
        })
      },function(){//验证失败
        MainService.alertMsg("请输入正确手机号")
      })
    }
    console.log("hello joinByMobile ")
  }
  function getVerificationCode(){
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
