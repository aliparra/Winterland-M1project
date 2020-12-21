class Snowfall{
    constructor(ctx,x){
        this.ctx=ctx

        this.x=x
        this.y=0

        this.width= this.ctx.canvas.width
        this.height= this.ctx.canvas.height

        this.vy = 0.3

        this.img = new Image()
        this.img.src = './assets/img/Background/snowflakes.png'
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
            this.ctx.drawImage(this.img,this.x , this.y - this.height, this.width,this.height) //Draw second image 
        }
    }

    move(){
        this.y+=this.vy;
        if(this.y  >= this.height){
            this.y=0
        }
    }
}
