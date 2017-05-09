/**
 * Created by lianshaoshuai on 17/4/25.
 */
angular.module("main.home")
    .factory("ngHome",['$log', '$rootScope', 'MainService','Content','ngUser',ngHome])
function ngHome(){
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

    return {
        chatall: chatall,
        removechat:removechat,
        getchatbyid: getchatbyid,
        friendsall:friendsall //获取好友列表
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
                return chats[i];
            }
        }
        return null;
    }
}