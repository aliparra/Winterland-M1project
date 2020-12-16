class Background{
    constructor(ctx){
        this.ctx=ctx

        this.x= 0
        this.y=0

        this.width = this.ctx.canvas.width
        this.heigth= this.ctx.canvas.heigth

        this.vx= -2

        this.img = new Image()
        this.img.src = './assets/img/Background_01.png'
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
            console.log('prueba')
            this.ctx.drawImage(this.img,this.x,this.y,this.width,this.heigth)

            this.ctx.drawImage(this.img,this.x + this.width, this.y, this.width,this.heigth)

        }

    }
}