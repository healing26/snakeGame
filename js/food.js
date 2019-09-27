(function (){
    var elements = [];
    function Food(x,y,width,height,color){
        this.width=width||20;
        this.height=height||20;
        this.x=x||0;
        this.y=y||0;
        this.color=color||"green";
    }
    Food.prototype.init = function(map){
        remove();
        var div = document.createElement("div");
        map.appendChild(div);
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;
        div.style.position="absolute";
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";

        elements.push(div);  //将div放进数组中，方便删除
    }
    function remove(){
        for(var i=0;i<elements.length;i++){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);  //根据div的父元素找到它的位置，移除自己
            elements.splice(i,1);  //清空element
        }
    }
    window.Food = Food;  //变为全局函数
}());