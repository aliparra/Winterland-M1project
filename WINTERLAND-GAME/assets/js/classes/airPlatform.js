
class AirPlatform {

    constructor(ctx,x,y){
        this.ctx= ctx

        this.width = 100
        this.height = 100

        this.x = x
        this.x1 = this.x + this.width
        this.x2 = this.x1 + this.width
        this.y = y
        


        //Platform image 1
        this.img = new Image()
        this.img.src = './assets/img/Platformer/Ground_10.png'
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }

        //Platform image 2
        this.img1 = new Image()
        this.img1.src = './assets/img/Platformer/Ground_11.png'
        this.ready1=false;
        this.img1.onload = () => {
            this.img1.ready1 = true
        }

        //Platform image 3
        this.img2 = new Image()
        this.img2.src = './assets/img/Platformer/Ground_12.png'
        this.ready2=false;
        this.img2.onload = () => {
            this.img2.ready2 = true
        }
    }

    isReady(){
        return this.img.ready
    }
    isReady1(){
        return this.img1.ready1
    }
    isReady2(){
        return this.img2.ready2
    }

    draw(){
        if(this.isReady()){
            this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height) 
        }

        if(this.isReady1()){
            this.ctx.drawImage(this.img1,this.x1,this.y,this.width,this.height) 
        }
        if(this.isReady2()){
            this.ctx.drawImage(this.img2,this.x2,this.y,this.width,this.height) 
        }
    }


}