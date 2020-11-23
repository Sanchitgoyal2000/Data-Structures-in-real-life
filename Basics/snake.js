canvas=document.getElementById("mycanvas");
function f(){
    console.log("key clicked");
}
canvas.addEventListener('click',f);

function init(){
    console.log("In int");
  
    w = canvas.width = 200;
    h = canvas.height = 200;

    pen = canvas.getContext('2d');
    rect = {
        x:20,
        y:20,
        w:40,
        h:40,
        speed:10,
        prev:0
    }
    game_over = false;
   
    

}
function draw(){
    pen.fillStyle = "red";
    pen.clearRect(rect.prev,rect.y,w,h);
    pen.fillRect(rect.x,rect.y,rect.w,rect.h);
}

function update(){
    rect.prev=rect.x;
    rect.x=rect.x+rect.speed;
    if(rect.w+rect.x>w||rect.x<0)
    {
        rect.speed=rect.speed*(-1);
    }
}
function gameloop(){
     draw();
     update();
     if(game_over==true)
     {
         clearInterval(f);
     }
}
init();
var f = setInterval(gameloop,100);



