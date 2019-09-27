(function(){
    var that = null;
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        this.flag=false;
        that = this;  //保存当前实例对象到that中
    }

    // Game.prototype.init = function (){
    //     this.food.init(this.map);
    //     this.snake.init(this.map);
    //     setInterval(function (){
    //         that.snake.move(that.food,that.map);
    //         that.snake.init(that.map);
    //     },150)
    // }
    
    Game.prototype.init = function (){
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food,this.map); //snake移动
        this.bindkey();  //按键方法
        this.point();
    }
    Game.prototype.runSnake = function (food,map){
        if(!this.flag){
            this.flag = true;
            var timeID = setInterval(function (){
                this.snake.move(food,map);
                this.snake.init(map);
                this.point();
                var maxX = map.offsetWidth/this.snake.width;
                var maxY = map.offsetHeight/this.snake.height;
                var headX = this.snake.body[0].x;
                var headY = this.snake.body[0].y;
                if(headX<0||headX>=maxX||headY<0||headY>=maxY){
                    this.flag = false;
                    clearInterval(timeID);
                    document.querySelector('.gmOver').innerText = '游戏结束,按R重新开始'
                    // alert("🐍$L");
                }
            }.bind(that),150);
        }else{
            return false
        }
    };
    Game.prototype.bindkey = function (){
        document.addEventListener("keydown",function (e){
            switch(e.keyCode){
                case 37:
                this.snake.direction="left";
                break;
                case 38:
                this.snake.direction="top";
                break;
                case 39:
                this.snake.direction="right";
                break;
                case 40:
                this.snake.direction="bottom";
                break;
                case 82:
                this.snake.body =[
                    {x:3,y:1,color:"red"},
                    {x:2,y:1,color:"orange"},
                    {x:1,y:1,color:"orange"}
                ];
                this.snake.direction="right";
                this.init();
                this.runSnake();
                document.querySelector('.gmOver').innerText = '';
                break;
            }
        }.bind(that),false)
    };
    Game.prototype.point = function(){
        var point = this.snake.body.length-3;
        document.querySelector('.point').innerText="当前得分数为："+point
    };
    window.Game=Game;
}());
var gm = new Game(document.querySelector(".map"));
gm.init();