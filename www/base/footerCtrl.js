/**
 * Created by aye on 2017/1/3.
 */
'use strict';
//$location用来获取url的参数,.search()是?和其之后的参数,path()是路径
angular.module('main').controller('FooterCtrl', ['$scope', '$rootScope', '$location', '$ionicHistory', FooterCtrl]);
console.log("footer")
function FooterCtrl($scope, $rootScope, $location, $ionicHistory) {

  var urlParam = ['chat','friends','space','user']
  $scope.views = {
    isShowFooter: false,
    activeNav: '',
    footerList: ['chat','friends', 'space','user'],
    toggleNav: function (nav) {
      var pagesSwitch = function () {
        $scope.views.activeNav = nav;
        if(nav == "user"){//跳转到info
          nav= "info"
          var router = "user."+nav;
          console.log("toggleNav_nav",router)
          $rootScope.jump(router);
        }
        if(nav == "space"){//跳转到space空间下
          nav= "space"
          var router = "space."+nav;
          console.log("toggleNav_nav",router)
          $rootScope.jump(router);
        }
        if(nav == "chat"){
          nav= "chat"
          var router = "home."+nav;
          console.log("toggleNav_nav",router)
          $rootScope.jump(router);
        }
        if(nav == "friends"){
          nav= "friends"
          var router = "home."+nav;
          console.log("toggleNav_nav",router)
          $rootScope.jump(router);
        }
        if(nav == "chat"){
          nav= "chat"
          var router = "home."+nav;
          console.log("toggleNav_nav",router)
          $rootScope.jump(router);
        }

      };
      return pagesSwitch();
    }
  };

  var init = function () {//路由控制
    //可以用路径的最后一个地方做版本控制
    var hasFooterRouter = ['chat', 'friends', 'space', 'user'],
        locationRouter = $location.path().slice(1),//去掉#后面的路径的/;
        locationParam = $location.search();
    var barrouter = locationRouter.split("/")
    console.log("***barrouter***", barrouter)
    if (barrouter[1] == "home" || barrouter[1] == "space" || barrouter[1] == "friends" || barrouter[1] == "chat") {
      $scope.views.isShowFooter = true;
    } else {
      $scope.views.isShowFooter = false;
    }
  }
  init();
  // 观察路由的变化
  $rootScope.$on('$stateChangeSuccess', function () {
    init();
  });
}
