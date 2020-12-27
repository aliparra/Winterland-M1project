class MisteryBox extends GenericClass{

    constructor(ctx,x,y){
        super(ctx,x,y)

        this.width = 100
        this.height = 100

        this.vx = 0
        this.vy = 0

        this.img = new Image()
        this.img.src = './assets/img/Platformer/Bonus.png'
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

    //NEEDS TO BE FIXED NOT WORKING YET
    showElement(prize){

            prize.y= this.y - 100
    }

}