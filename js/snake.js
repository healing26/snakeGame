(function (){
    var elements=[];
    function Snake(width,height,direction){
        this.width=width||20;
        this.height=height||20;
        this.body =[
            {x:3,y:1,color:"red"},
            {x:2,y:1,color:"orange"},
            {x:1,y:1,color:"orange"}
        ];

        this.direction=direction||"right";
    }
    Snake.prototype.init = function(map){
        remove();
        for(var i=0;i<this.body.length;i++){
            var obj = this.body[i]
            var div = document.createElement("div");
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            div.style.position="absolute";
            div.style.backgroundColor=obj.color;
            div.style.left=obj.x*this.width+"px";
            div.style.top=obj.y*this.height+"px";
            map.appendChild(div);
            elements.push(div);
        }

    }
    Snake.prototype.move = function(food,map){
        var i = this.body.length-1;
        for(i;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }
        switch(this.direction){
            case "right":
                this.body[0].x+=1;
                break;
            case "left":
                this.body[0].x-=1;
                break;
            case "top":
                this.body[0].y-=1;
                break;
            case "bottom":
                this.body[0].y+=1;
                break;
        }
        var headX = this.width*this.body[0].x;
        var headY = this.height*this.body[0].y;
        if(headX==food.x&&headY==food.y){
            this.body.push({
                x:this.body[this.body.length-1].x,
                y:this.body[this.body.length-1].y,
                color:this.body[this.body.length-1].color
            });
            food.init(map);
        }
    }
    function remove(){
        var i=elements.length-1;
        for(;i>=0;i--){
            var ele=elements[i]
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }
    window.Snake=Snake;
}());