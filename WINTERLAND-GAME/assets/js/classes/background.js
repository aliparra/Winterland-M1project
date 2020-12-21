class Background{
    constructor(ctx,x){

        this.ctx = ctx

        //Background x and y position
        this.x = x
        this.y = 0

        //Canvas dimensions
        this.width = this.ctx.canvas.width
        this.height = this.ctx.canvas.height

        //Background movement speed
        this.vx = -0.5
        
        //Background image
        this.img = new Image()
        this.img.src = './assets/img/Background/Background_01.png'
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

            this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height) //Draw first image
            
        }
    }




}