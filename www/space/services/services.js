/**
 * Created by lianshaoshuai on 17/4/27.
 */
angular.module('main.space')
    .factory('ngSpace',['$log', '$rootScope', 'MainService','Content','ngUser','Review',ngSpace])
function ngSpace($log,$rootScope,MainService,Content,ngUser,Review){

    return {
        postmyspace: postmyspace,
        getMyContent:getMyContent,
        postreview:postreview
    }
    function postreview (comment,sucb,errcb){
        var appid = ngUser.getUserInfo().lbuserId;//获取到id
        console.log("****postreview***",comment)
        Review.create({id:ngUser.getUserInfo().lbuserId},comment,function(result){//创建数据正确处理
            console.log("****postreview***result",result)
            sucb(result);
        },function(err){//创建数据错误处理
            errcb(err)
        })
    }
    function postmyspace (prama,successcb,errcb){
        var appid = ngUser.getUserInfo().lbuserId;//获取到id
        Content.create({id:appid},prama,function(result){
            successcb(result)
            console.log("postmyspace_result",result)
        },function(err){//错误处理
            console.log("postmyspace_result_err",err)
            errcb(err)
        })
    }
    function getMyContent (successcb,errcb){
        var appid = ngUser.getUserInfo().lbuserId;//获取到id
        Content.getMyContent({id:appid},function(res){
            successcb(res)
        },function(err){
            errcb(err)
            console.log("ngSpace_getMyContent",err)
        })
    }

}