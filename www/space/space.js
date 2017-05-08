/**
 * Created by lianshaoshuai on 17/4/27.
 */
angular.module('main.space',[])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider.state("space",{
            url:'/space',
            abstract : true,
            templateUrl:""
        })
        .state("space.space",{
            url:'/space',
            controller:"SpaceCtrl as spc",
            templateUrl:"space/templates/space.html"
        })
        .state("space.edit",{
            url:'/edit',
            controller:"EditCtrl as edc",
            templateUrl:"space/templates/edit.html"
        })
        .state("space.myspace",{
            url:'/myspace',
            controller:"MyspaceCtrl as msc",
            templateUrl:"space/templates/myspace.html"
        })
        .state("space.postmyspace",{
            url:'/postmyspace',
            controller:"PostMyspaceCtrl as pmsc",
            templateUrl:"space/templates/postmyspace.html"
        })
        $urlRouterProvider.otherwise('/space/space');
        console.log("come in space")
    })
