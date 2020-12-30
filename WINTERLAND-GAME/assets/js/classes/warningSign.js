class WarningSign extends GenericClass{

    constructor(ctx,x,y){
        super(ctx,x,y)

        this.width = 70
        this.height = 70 

        this.img = new Image()
        this.img.src = './assets/img/Environment/Sign_05.png'
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