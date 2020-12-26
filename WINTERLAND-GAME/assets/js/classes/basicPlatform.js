class BasicPlatform{

    constructor(ctx,x,y,width,height){
        this.ctx=ctx
        //Platform position 
        this.x= x
        this.y= y

        //Canvas dimensions
        this.width= width
        this.height=height

        
        //Platform image
        this.img = new Image()
        this.img.src = './assets/img/Platformer/Ground_02.png'
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }



    }

    isReady(){
        return this.img.ready
    }

    draw(){
        if(this.isReady()){
        
            this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height) 
             
        }
    }


   
    
}