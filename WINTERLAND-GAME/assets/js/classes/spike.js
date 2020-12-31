class Spike extends GenericClass{

    constructor(ctx,x,y,realx){
        super(ctx,x,y)
        this.realx= realx 
        this.width = 90
        this.height = 90 
        this.appears = false

        this.img = new Image()
        this.img.src = './assets/img/Platformer/Spikes.png'
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }
    }

    isReady(){
        return this.img.ready
    }


    draw(){
        console.log(this.appears)
        if(this.isReady() && this.appears){
        this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height)   
        }
    }

    appear(element){
        if(this.x < element.x + 150 + element.width &&
            this.x + this.width > element.x + 150 &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){
                this.appears = true
                console.log('appears')
            } 
    }
    collision(element){
        if(this.x < element.x + element.width &&
            this.x + this.width > element.x  &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){
                element.health -= MAINATTACK
                element.healthStatus()
            }
    }
    
}