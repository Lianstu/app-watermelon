/**
 * Created by lianshaoshuai on 17/4/27.
 */
angular.module('main.space')
    .factory('ngSpace',['$log', '$rootScope', 'MainService','Content','ngUser',ngSpace])
function ngSpace($log,$rootScope,MainService,Content,ngUser){

    return {
        postmyspace: postmyspace,
        getMyContent:getMyContent
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
            successcb(res.result)
        },function(err){
            errcb(err)
            console.log("ngSpace_getMyContent",err)
        })
    }

}