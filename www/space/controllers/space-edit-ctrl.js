/**
 * Created by lianshaoshuai on 17/4/27.
 */
angular.module("main.space")
    .controller("EditCtrl",['$log', '$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet', EditCtrl])
function EditCtrl ($log,$scope,ngUser,MainService,User,$ionicActionSheet){
    console.log("EditCtrl")
    $scope.views={
        //myedit : "&nsbp2107-4.27我是东北大学的一名大四毕业生,此次是毕设的作品,之后会发布到github上;联系邮箱:lianxiaoshuai@aliyun.com.<p>最近在知乎上做资料整理写技术点,希望能让自己成绩更上一层楼;一句古语与君共勉:行者常至,为者常成</p>!"
    }
}

/**
 * Created by lianshaoshuai on 17/4/27.
 */
