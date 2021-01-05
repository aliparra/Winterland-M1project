class BasicPlatform{

    constructor(ctx,x,y,width,height,type){
        this.ctx=ctx
        //Platform position 
        this.x= x
        this.y= y
        this.type = type
        //Canvas dimensions
        this.width= width
        this.height=height
        this.type = type
        
        //Platform image
        this.img = new Image()
        if(this.type === 'basic'){
            this.img.src = './assets/img/Platformer/Ground_02.png'
        }else if(this.type === 'bridge'){
            this.img.src = './assets/img/Platformer/Bridge_01.png'
        }
        else if(this.type === 'ice'){
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