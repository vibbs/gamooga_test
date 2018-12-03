var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(4200);  



var client_connections = {};

var final_statement = "";
var global_word_context = "";
function emit_reverse(char, client_object){
    if(char === " " || char == undefined){
        var return_word = ""
        for(var i =client_object.global_word_context.length-1 ; i >= 0 ;  i--){
            client_object.final_statement += client_object.global_word_context[i];
        }
        client_object.global_word_context = "";
        client_object.final_statement += " "+ return_word;
    }else{
        client_object.global_word_context +=char
    }
}


io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(connection_id) {
        console.log(connection_id);

        if(!client_connections.hasOwnProperty(connection_id)){
            client_connections[connection_id] = {
                final_statement : "",
                global_word_context : "",
            };
        }
      
        client.on(connection_id, function(char) {
             if(char ==  "terminate-x-x-x"){
                emit_reverse(" ", client_connections[connection_id])
                client.emit(connection_id, client_connections[connection_id].final_statement);
                client_connections[connection_id].final_statement = "";
                client_connections[connection_id].global_word_context = "";
             }else{
                 emit_reverse(char, client_connections[connection_id])
                 client.emit(connection_id, client_connections[connection_id].final_statement);
             }
         });
    })

    
    
});