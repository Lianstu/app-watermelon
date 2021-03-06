/**
 * Created by lianshaoshuai on 17/4/25.
 */
angular.module("main.home")
    .factory("ngHome",['$log', '$rootScope', 'MainService','Content','ngUser','Chat',ngHome])
function ngHome($log, $rootScope, MainService,Content,ngUser,Chat){
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];
    //好友假数据
    var friends = [{
        id: 0,
        name: 'Ben Sparrow',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        face: 'img/adam.jpg'
    }];
    //聊天记录
    var messageDetils =  [{
        "id": 8,
        "name": "李明",
        "pic": "img/adam.jpg",
        "lastMessage": {
            "originalTime": "2015-11-27 06:34:55",
            "time": "",
            "timeFrome1970": 0,
            "content": "你在干什么?",
            "isFromeMe": false
        },
        "noReadMessages": 2,
        "showHints": true,
        "isTop": 0,
        "message": [{
            "isFromeMe": false,
            "content": "你好!",
            "time": "2015-11-22 08:50:22"
        }, {
            "isFromeMe": true,
            "content": "你好, 你是谁?",
            "time": "2015-11-22 08:51:02"
        }, {
            "isFromeMe": false,
            "content": "你在干什么?",
            "time": "2015-11-27 06:34:55"
        }, {
            "isFromeMe": true,
            "content": "知道怎么搞的吗?",
            "time": "2015-11-22 08:51:02"
        }, {
            "isFromeMe": false,
            "content": "这是一道可以测出一个人有没有商业头脑的数学题这是一道可以测出一个人有没有商业头脑的数学题",
            "time": "2015-11-27 06:34:55"
        }, {
            "isFromeMe": false,
            "content": "喝咖啡对身体好吗?",
            "time": "2015-11-22 08:51:02"
        }, {
            "isFromeMe": false,
            "content": "在澳洲申请新西兰签证",
            "time": "2015-11-27 06:34:55"
        }, {
            "isFromeMe": true,
            "content": "说走就走的旅行",
            "time": "2015-11-22 08:51:02"
        }, {
            "isFromeMe": false,
            "content": "ok",
            "time": "2015-11-27 06:34:55"
        }, {
            "isFromeMe": true,
            "content": "拉玛西亚",
            "time": "2015-11-22 08:51:02"
        }, {
            "isFromeMe": true,
            "content": "拉玛西亚影视学院招生简章",
            "time": "2015-11-27 06:34:55"
        }, {
            "isFromeMe": true,
            "content": "去黑头产品排行榜",
            "time": "2015-11-22 08:51:02"
        }, {
            "isFromeMe": false,
            "content": "美国大使馆 北京",
            "time": "2015-11-27 06:34:55"
        }, {
            "isFromeMe": false,
            "content": "被开水烫伤怎么办?",
            "time": "2015-11-22 08:51:02"
        }, {
            "isFromeMe": false,
            "content": "谁说菜鸟不会数据分析?",
            "time": "2015-11-27 06:34:55"
        }, {
            "isFromeMe": true,
            "content": "谁念西风独自凉",
            "time": "2015-11-22 08:51:02"
        }, {
            "isFromeMe": false,
            "content": "被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常",
            "time": "2015-11-27 06:34:55"
        }]
    }, {
        "id": 1,
        "name": "王峰",
        "pic": "img/ben.png",
        "lastMessage": {
            "originalTime": "2015-11-26 5:22:55",
            "time": "",
            "timeFrome1970": 0,
            "content": "明天什么时候去吃饭?",
            "isFromeMe": false
        },
        "noReadMessages": 5,
        "showHints": true,
        "isTop": 0,
        "message": [{
            "isFromeMe": false,
            "content": "你好!",
            "time": "2015-11-22 08:50:22"
        }, {
            "isFromeMe": true,
            "content": "你好, 你是谁?",
            "time": "2015-11-22 08:51:02"
        }, {
            "isFromeMe": false,
            "content": "明天什么时候去吃饭?",
            "time": "2015-11-26 5:22:55"
        }]
    }, {
        "id": 7,
        "name": "潘敏",
        "pic": "img/max.png",
        "lastMessage": {
            "originalTime": "2015-11-22 15:34:55",
            "time": "",
            "timeFrome1970": 0,
            "content": "我就在软件园?",
            "isFromeMe": false
        },
        "noReadMessages": 0,
        "showHints": false,
        "isTop": 0,
        "message": [{
            "isFromeMe": false,
            "content": "你好!",
            "time": "2015-11-22 08:50:22"
        }, {
            "isFromeMe": true,
            "content": "你好, 你是谁?",
            "time": "2015-11-22 08:51:02"
        }, {
            "isFromeMe": false,
            "content": "我就在软件园?",
            "time": "2015-11-22 15:34:55"
        }]
    }, {
        "id": 2,
        "name": "王振启",
        "pic": "img/mike.png",
        "lastMessage": {
            "originalTime": "2015-11-21 15:34:55",
            "time": "",
            "timeFrome1970": 0,
            "content": "周末有什么安排?",
            "isFromeMe": false
        },
        "noReadMessages": 20,
        "showHints": true,
        "isTop": 0
    }, {
        "id": 6,
        "name": "许仁杰",
        "pic": "img/perry.png",
        "lastMessage": {
            "originalTime": "2014-10-12 15:34:55",
            "time": "",
            "timeFrome1970": 0,
            "content": "好",
            "isFromeMe": false
        },
        "noReadMessages": 0,
        "showHints": false,
        "isTop": 0
    }]

    return {
        findmyfriend:findmyfriend,
        isaccepted:isaccepted,
        addfriend:addfriend,
        existfriend: existfriend,//添加好友前的查找
        chatpost : chatpost,
        chatall: chatall,
        removechat:removechat,
        getchatbyid: getchatbyid,
        friendsall:friendsall //获取好友列表
    }
    function findmyfriend(sucb,errcb){
        Chat.findmyfriend({id:ngUser.getUserInfo().lbuserId},function(result){
            sucb(result)
        },function(err){
            errcb(err)
        })
    }
    function isaccepted(mobile,option,subcb,errcb){
        console.log("isaccepted",mobile,typeof mobile,option)
        Chat.isaccepted({hermobile:mobile,options:option},{id:ngUser.getUserInfo().lbuserId},function(result){
            subcb(result)
        },function(err){
            errcb(err)
        })
    }

    function addfriend(mobile,message,sucb,errcb){
        Chat.addfriend({mobile:mobile,message:message},{id:ngUser.getUserInfo().lbuserId},function(result){
            sucb(result)
        },function(err){
            errcb(err)
        })
    }
    function existfriend(mobile,sucb,errcb){
        Chat.existFriend({mobile:mobile},{id:ngUser.getUserInfo().lbuserId},function(result){
            sucb(result)
        },function(err){
            errcb(err)
        })
    }
    function chatpost (chatdata,successcb,errcb){
        console.log("ngHome_chatpost_chatdata",chatdata)
        Chat.ChatwithFriend({pubsub:chatdata},{id:ngUser.getUserInfo().lbuserId},function(result){//正确处理
            console.log("***Chat.create_result***",result)
            successcb(result)
        },function(err){//post错误处理
            console.log("***Chat.create_err***",err)
            errcb(err)
        })
    }
    function friendsall() {
        return friends;
    }
    function chatall() {
        return chats;
    }
    function removechat(chat) {
        chats.splice(chats.indexOf(chat), 1);
    }
    function getchatbyid(chatId) {//用来获取某个id的
        for (var i = 0; i < chats.length; i++) {
            if (chats[i].id === parseInt(chatId)) {
                return messageDetils[0]
            }
        }
        return null;
    }
}
