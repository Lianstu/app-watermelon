/**
 * Created by lianshaoshuai on 17/5/11.
 */
angular.module('main.home')
    .factory('PubSub', function (socket) {
        var container =  [];
        console.log("come in pubsub")
        return {
            subscribe: function(options, callback){
                console.log("come in subscribe")
                if(options){
                    var collectionName = options.collectionName;
                    var modelId = options.modelId;
                    var method = options.method;
                    if(method === 'POST'){
                        var name = '/' + collectionName + '/' + method;
                        console.log("PubSub_subscribe_name",name)
                        socket.on(name, callback);
                    }
                    else{
                        var name = '/' + collectionName + '/' + modelId + '/' + method;
                        socket.on(name, callback);
                    }
                    //Push the container..
                    this.pushContainer(name);
                }else{
                    throw 'Error: Option must be an object';
                }
            }, //end subscribe

            pushContainer : function(subscriptionName){
                container.push(subscriptionName);
            },

            //Unsubscribe all containers..
            unSubscribeAll: function(){
                for(var i=0; i<container.length; i++){
                    socket.removeAllListeners(container[i]);
                }
                //Now reset the container..
                container = [];
            }

        };
    });

