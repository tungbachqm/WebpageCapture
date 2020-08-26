var canvas_top_left = { top: 0, left: 0};
var state = {state: 0};
document.body.onmousedown = function(){
    chooseArea(event, canvas_top_left, state);
}
function chooseArea(event, canvas_top_left, state){
    if (state.state == 0){
        var added_layer = document.createElement('div');
        added_layer.id = 'added_layer';
        added_layer.style.backgroundColor = 'grey';
        added_layer.style.position = 'fixed';
        added_layer.style.top = '0px';
        added_layer.style.left = '0px';
        added_layer.style.width ='100%';
        added_layer.style.height = '100%';
        added_layer.style.zIndex = '101';
        added_layer.style.opacity = '0.2';
        document.body.appendChild(added_layer)
        state.state = 1;
    }
    else{
        //console.log(canvas_top_left);
        canvas_top_left.left = event.clientX;
        canvas_top_left.top = event.clientY;
        //console.log(event.clientX);
        console.log(canvas_top_left);
        state.state = 0;
    }
}
//document.body.addEventListener("mousedown", chooseArea(event, canvas_top_left));
document.body.onmouseup = function(){
    on_mouse_up_handler(event, create_child_canvas_to_added, canvas_top_left, state);
}
function on_mouse_up_handler(event, callback, canvas_top_left, state){
    if (state.state === 0){
        chrome.extension.sendMessage({name: 'screenshot'}, function(response) {

            var data = response.screenshotUrl;
            var canvas = document.createElement('canvas');
            var img = new Image();
            img.onload = function() {
                /*canvas.width = window.width;
                canvas.height = window.height;*/
                canvas.width = $(window).width();
                canvas.height = $(window).height();
                
                canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    
                var $canvas = $(canvas);
                $canvas.data('scrollLeft', $(document.body).scrollLeft());
                $canvas.data('scrollTop', $(document.body).scrollTop());
                
    
                // Perform callback after image loads
                
                //document.body.appendChild(canvas);
                if (callback){
                    callback(event, canvas, canvas_top_left);
                }
                //callback($canvas);
            }
            img.src = data;
            img.style.position = 'fixed';
            img.style.top = '0px';
            img.style.left = '0px';
            img.style.zIndex = '102';
            img.id = 'img_layer';
            //document.body.appendChild(img);    
        });
        var img = document.getElementById('img_layer');
        console.log(img);
        /*if (canvas_top_left.top == null || canvas_top_left.left == null){
            console.log(canvas_top_left);
            console.log ("Is null");
        }
        else {
            can_vas_top = canvas_top_left.top;
            can_vas_left = canvas_top_left.left;
            var previewCanvas = document.createElement('canvas');
            previewCanvas.width = callback.clientX - can_vas_left;
            previewCanvas.height = callback.clientY - can_vas_top;
            previewCanvas.style.zIndex = "103";
            console.log(callback.clientX, can_vas_left);
            ctx = previewCanvas.getContext("2d");
            ctx.drawImage(img, can_vas_left, can_vas_top, previewCanvas.width, previewCanvas.height,
                                        0, 0, previewCanvas.width, previewCanvas.height);
            //var added_canvas =renderPreview (element, img);
            document.body.appendChild(previewCanvas);
        }
        console.log(canvas_top_left)
        console.log(response)
        console.log(img.src);
        var added_layer = document.getElementById('added_layer');
        document.body.removeChild(img);
        document.body.removeChild(added_layer);*/
        state.state = 0;
    }
    
}
function create_child_canvas_to_added(event, canvas, canvas_top_left){
    if (canvas_top_left.top == null || canvas_top_left.left == null){
            console.log(canvas_top_left);
            console.log ("Is null");
        }
        else {
            can_vas_top = canvas_top_left.top;
            can_vas_left = canvas_top_left.left;
            var previewCanvas = document.createElement('canvas');
            previewCanvas.width = event.clientX - can_vas_left;
            previewCanvas.height = event.clientY - can_vas_top;
            previewCanvas.style.zIndex = "103";
            console.log(event.clientX, can_vas_left);
            ctx = previewCanvas.getContext("2d");
            ctx.drawImage(canvas, can_vas_left, can_vas_top, previewCanvas.width, previewCanvas.height,
                                        0, 0, previewCanvas.width, previewCanvas.height);
            //var added_canvas =renderPreview (element, img);
            document.body.appendChild(previewCanvas);
        }
        console.log(canvas_top_left);
        var added_layer = document.getElementById('added_layer');
        document.body.removeChild(added_layer);
}
function renderPreview($element, $screenshotCanvas) {
    var previewCanvas = document.createElement('canvas');
    previewCanvas.width = $element.width();
    previewCanvas.height = $element.height();
    //console.log(previewCanvas.width)
    // Calculate the correct position of the element on the canvas
    var prevTop = $element.offset().top - $screenshotCanvas.data('scrollTop');
    var prevLeft = $element.offset().left - $screenshotCanvas.data('scrollLeft');

    var ctx = previewCanvas.getContext("2d");
    ctx.drawImage($screenshotCanvas[0], prevLeft, prevTop,
                                        $element.width(), $element.height(),
                                        0, 0,
                                        $element.width(), $element.height());
    //document.body.appendChild(previewCanvas);
    return $(previewCanvas)
                .css({ border:'1px solid black' });
}
/*document.body.onmousedown = chooseArea;
document.body.onmouseup = function(){
    draw_canvas(event, can_vas_left, can_vas_top);
}
function chooseArea(event){
    
    can_vas_left = event.clientX;
    can_vas_top = event.clientY;
    console.log("You have choose the layer");
}
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
        document.body.appendChild(can_vas);
        
        //document.getElementById("div_2").appendChild(shot_butoon)
        html2canvas(document.querySelector("#capture")).then(canvas => {
            document.body.appendChild(canvas)
        });
    }
    
}*/