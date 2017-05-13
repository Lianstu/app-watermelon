angular.module('main.home')
    //Here LoopBackAuth service must be provided as argument for authenticating the user
    .factory('socket', function(LoopBackAuth){
        //Creating connection with server
        var socket = io.connect('http://localhost:3000');
        //This part is only for login users for authenticated socket connection between client and server.
        //If you are not using login page in you website then you should remove rest piece of code..
        var id = LoopBackAuth.accessTokenId;
        var userId = LoopBackAuth.currentUserId;
        console.log("id",id,"userId",userId)
        socket.on('connect', function(){
            socket.emit('authentication', {id: id, userId: userId });
            socket.on('authenticated', function() {
                // use the socket as usual
                console.log('User is authenticated');
            });
        });
        return socket;
    });

