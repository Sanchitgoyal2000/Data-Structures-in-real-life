

function init(){
    
    var canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cs = 50;
    prevX = 0;
    prevY = 0;
    food = getRandomFood();
    game_over = false;
    score = 5;

    food_img = new Image();
    food_img.src = "apple.jpg";

    trophy_img = new Image();
    trophy_img.src = "trophy.jpg";

    snake = {
        init_len : 5,
        color: "blue",
        cells:[],
        direction : "right",

        createSnake : function(){
            for(var i=this. init_len;i>0;i--)
            {
                this.cells.push({x:(i*cs),y:(0*cs)})
            }
        },

        drawSnake : function(){
           
            pen.fillStyle=this.color;
            for(var i=0;i<this. init_len;i++)
            pen.fillRect(this.cells[i].x,this.cells[i].y,cs-2,cs-2);     //cs-2 for separation

            pen.drawImage(trophy_img,10,20,cs,cs);
            pen.fillStyle = "blue";
            pen.font = "20px Roboto";
            pen.fillText(score,50,50);
        },

        updateSnake : function(){

         
            var len=this.cells.length-1;
            prevX = this.cells[len].x;   //to delete the last drawn rectangle
            prevY = this.cells[len].y;

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX==food.x&&headY==food.y)
            {
                score++;
                food = getRandomFood();
            }
            else
            {
              this.cells.pop();
            }
            var nextX,nextY;

            if(this.direction=="right")
            {
                nextX = headX+cs;
                nextY = headY;
            }
            else if(this.direction == "left")
            {
                nextX = headX-cs;
                nextY = headY;
            }
            else if(this.direction == "down")
            {
                nextX = headX;
                nextY = headY+cs;
            }
            else
            {
               nextX = headX;
               nextY = headY-cs;
            }

            
            this.cells.unshift({x:nextX,y:nextY});
            if(this.cells[0].x<0 || this.cells[0].y>H || this.cells[0].x>W  || this.cells[0].y<0)
            {
                console.log("oh ddddd");
                game_over = true;

            }
        }
    }
    snake.createSnake();
    function keyPressed(e)
    {
       if(e.key=="ArrowRight")
         snake.direction = "right";
        else if(e.key == "ArrowLeft")
          snake.direction = "left";
        else if(e.key == "ArrowDown")
          snake.direction = "down";
        else
          snake.direction = "up";
    }
    document.addEventListener('keydown',keyPressed);

}
function draw(){
    pen.clearRect(prevX,prevY,W,H);             //to clear previous drawn rectangle
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x,food.y,cs,cs);
}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);         //divide by cs bcz we want food at some certain points ie at starting 
    var foodY = Math.round(Math.random()*(H-cs)/cs);         // -cs bcz we dont want food is placed at the end;
   
    var food ={
        x:foodX*cs,
        y:foodY*cs,
        color : "red",
    }

   
    return food;
}

function gameloop(){
    if(game_over == true)
    {
      clearInterval(f);
      alert("Game Over");
    }
       draw();
      update();
}

init();
var f = setInterval(gameloop,100);




