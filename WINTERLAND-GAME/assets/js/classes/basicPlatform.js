class BasicPlatform{

    constructor(ctx,x,y,width,height,basic){
        this.ctx=ctx
        //Platform position 
        this.x= x
        this.y= y

        //Canvas dimensions
        this.width= width
        this.height=height
        this.basic = basic
        
        //Platform image
        this.img = new Image()
        if(this.basic){
        this.img.src = './assets/img/Platformer/Ground_02.png'
        }else{
        this.img.src = './assets/img/Environment/Icicle_02.png'    
        }
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