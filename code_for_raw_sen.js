//import html2canvas from 'html2canvas';
var pic_query = document.getElementsByClassName("picture");
//console.log(pic_query);
for (item of pic_query){
    console.log(item.src);
}
var can_vas_left, can_vas_top;
var doc_body = document.getElementById("body_1");

var added_str = '<div id = "added layer" class="ocrext-element ocrext-mask" style="left: 0px; top: 0px; width: 1000px; height: 1000; z-index: 100; position:fixed; background-color: gray; opacity: 0.2">'
    +'<p class="ocrext-element" style="opacity: 1; color: black">Please select text to grab.</p>'
    +'<div class="ocrext-overlay-corner ocrext-corner-tl" style="top: 0px; left: 0px; width: 397.5px; height: 100.5px;"></div>'
    +'<div class="ocrext-overlay-corner ocrext-corner-tr" style="top: 05px; left: 397.5px; width: 397.5px; height: 100.5px;"></div>'
    +'<div class="ocrext-overlay-corner ocrext-corner-br" style="top: 444.5px; left: 397.5px; width: 397.5px; height: 100.5px;"></div>'
    +'<div class="ocrext-overlay-corner ocrext-corner-bl" style="top: 444.5px; left: 0px; width: 397.5px; height: 100.5px;"></div>'
    +'</div>'
//old 444.5
console.log(doc_body);
doc_body.innerHTML = doc_body.innerHTML + added_str
var added_layer = document.getElementById("added layer");
console.log(added_layer);
//add module for html2canvas;
/*var canvas_script = document.createElement("script");
canvas_script.type = "module";
canvas_script.src = ""*/

// add html2canvas child script
var add_to_head = '<script type="text/javascript" src="C:/Users/Admin/Documents/Visual Code Project/Chrome_extension_try/node_modules/html2canvas/dist/html2canvas.js"></script>';
var add_to_head_1 = '<script type = "module" src= "html_2_canvas.js"></script>'
document.head.innerHTML = document.head.innerHTML + add_to_head + add_to_head_1;

//create script ele for html2canvas file
/*var html2canvas_act_script = document.createElement("script");
html2canvas_act_script.type = "module";*/
//html2canvas_act_script.src = "C:/Users/Admin/Documents/Visual Code Project/Chrome_extension_try/html_2_canvas.js";
/*html2canvas_act_script.innerText = 
'import html2canvas from "/node_modules/html2canvas/dist/html2canvas.js";' +
'console.log("THIS is html2canvas action file");' +
'html2canvas(document.querySelector("#Test")).then(canvas => {document.body.appendChild(canvas)});'
added_layer.onmousedown = chooseArea;
added_layer.onmouseup = function(){
    draw_canvas(event, can_vas_left, can_vas_top);
}*/ 

added_layer.onmousedown = chooseArea;
added_layer.onmouseup = function(){
    draw_canvas(event, can_vas_left, can_vas_top);
}
function chooseArea(event){
    
    can_vas_left = event.clientX;
    can_vas_top = event.clientY;
    console.log("You have choose the layer");
}
///create take screen shot button
var shot_butoon = document.createElement("button");
shot_butoon.innerText = "Shot"
/*shot_butoon.onmousedown = function(){
    console.log("THIS IS THE BUTTON");
}*/
//shot_butoon.onclick = take_scrennshot;
shot_butoon.style.zIndex = "200";

/*var button_html = '<button onclick = "my_function" style = "z-index = 200">Shoot</button> +
'<script>' +
    'function take_scrennshot() {
        console.log("Take shot")
        html2canvas(document.getElementById("capture"), {
            onrendered: function (canvas) {
                document.body.appendChild(canvas);
            },
            width:320,
            height:220
        });
    }'
</script>'*/
function draw_canvas(event, left, top){
    if (can_vas_left == null || can_vas_top == null){
        console.log ("Is null");
    }
    else{
        var can_vas = document.createElement("canvas");
        can_vas.id = "capture";
        can_vas.style.left = left;
        can_vas.style.top = top;
        can_vas.width = event.clientX - left;
        can_vas.height = event.clientY - top;
        can_vas.style.zIndex = "101";
        can_vas.style.border = "1px solid #000000";
        can_vas.style.position = "fixed";
        console.log("You have release the layer");
        added_layer.appendChild(can_vas);
        //document.getElementById("div_2").appendChild(html2canvas_act_script)
        document.getElementById("div_2").appendChild(shot_butoon)
    }
    /*var canvas_cap = can_vas.toDataURL();
    var ctx = can_vas.getContext("2d");
    var save_img = new Image();
    ctx.stroke();
    save_img.src = can_vas.toDataURL("image/png");
    console.log(save_img.src);
    console.log(canvas_cap);
    console.log(ctx);*/
}
/*function take_scrennshot() {
    console.log("Take shot")
    html2canvas(document.getElementById("capture"), {
        onrendered: function (canvas) {
            document.body.appendChild(canvas);
        },
        width:320,
        height:220
    });
}*/