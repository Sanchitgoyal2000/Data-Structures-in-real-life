function load_images(){
    enemy_image = new Image();
    enemy_image.src = "Assets/v1.jpg";
    
    player_img =new Image();
    player_img.src = "Assets/superhero.jpg";
    
    gem_img = new Image();
    gem_img.src = "Assets/gem.jpg"
}

function init( ){
    //define objects that we will use;
   canvas = document.getElementById("mycanvas");
    
    W = 700;
    H = 400;
    
    canvas.width=W;
    canvas.height=H;  
    
    
    
   
    pen = canvas.getContext('2d');
    
    e1 = {
        x:150,
        y:50,
        w:60,
        h:60,
        speed:10
    };
    
        e2 = {
        x:300,
        y:150,
        w:60,
        h:60,
        speed:20
    };
    
        e3 = {
        x:450,
        y:20,
        w:60,
        h:60,
        speed:30
    };
    
    enemy = [e1,e2,e3];
    
    player = {
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:false,
        health:100,
    },
        
    gem = {
        x:W-100,
        y:H/2,
        w:60,
        h:60
        
    };
    
    game_over =false;
    
    canvas.addEventListener('mousedown',function(){                      //on mouse click
        player.moving = true;
    })
    
    canvas.addEventListener('mouseup',function(){                        // on mouse released
        player.moving = false;
    })
    
    
}

function isOverlap(rect1,rect2){
    console.log("yoyoy");
    if(rect1.x<rect2.x+rect2.w && 
       rect1.x+rect1.w>rect2.x && 
       rect1.y<rect2.y+rect2.h && 
       rect1.y+rect1.h>rect2.y){
        return true;
    }
    return false;
}

function draw( ){
     pen.fillStyle = "red";
    pen.clearRect(0,0,W,H);
    //pen.fillRect(box.x,box.y,box.w,box.h);
    //pen.drawImage(enemy_image,box.x,box.y,box.h,box.w);
    
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    
    for(let i=0;i<enemy.length;i++)
        {
            pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].h,enemy[i].w);
        }
    
    pen.fillStyle = "white";
    pen.fillText("score"+player.health,10,10);
}

function update( ){
    
    if(player.moving==true){
        player.x=player.x+player.speed;
        player.health+=20;
    }
    
    for(let i=0;i<enemy.length;i++)
        {
            if(isOverlap(enemy[i],player))
                {
                    player.health-=50;
                }
            if(player.health<0)
                {
                    game_over=true;
                    alert("Game Over");
                }
        }
    if(isOverlap(player,gem))
        {
            console.log("Won");
            alert("You Won");
            game_over = true;
            
        }
    
    for(let i=0;i<enemy.length;i++)
    {
     enemy[i].y = enemy[i].y + enemy[i].speed;  //move it downwards
     if(enemy[i].y >= H-enemy[i].h|| enemy[i].y<0)
        {
            enemy[i].speed = enemy[i].speed * (-1);
        }
    }
}

function gameloop( ){
    if(game_over==true)
        {
            clearInterval(f);
        }
    draw();
    update();
    console.log("yee")
}

load_images();
init();
setInterval(gameloop,100);