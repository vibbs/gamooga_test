var str_input = "this is a sample sentence and this stream is very long";



var final_statement = "";
var global_word_context = "";
function emit_reverse(char){
    console.log(char);
    if(char === " "){
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



for(var i = 0 ; i < str_input.length ; i++){
    //this is to simulate the streaming from the socket
    emit_reverse(str_input[i]);
}

//console.log(final_statement);
