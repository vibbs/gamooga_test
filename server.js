var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(4200);  


var final_statement = "";
var global_word_context = "";
function emit_reverse(char){
    if(char === " " || char == undefined){
        var return_word = ""
        for(var i =global_word_context.length-1 ; i >= 0 ;  i--){
            final_statement += global_word_context[i];
        }
        global_word_context = "";
        final_statement += " "+ return_word;
    }else{
        global_word_context +=char
    }
}


io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(connection_id) {
        console.log(connection_id);
    })

    client.on('messages', function(char) {
       console.log(char);
        if(char ==  "terminate-x-x-x"){
            final_statement = "";
            global_word_context = "";
        }else if(char.length>1){
            emit_reverse(" ")
            client.emit('broad', final_statement);
        }else{
            emit_reverse(char)
            client.emit('broad', final_statement);
        }
    });
    
});