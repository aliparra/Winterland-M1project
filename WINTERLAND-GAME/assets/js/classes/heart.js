class Heart extends GenericClass{

    constructor(ctx,x,y){
        super(ctx,x,y)

        //Size
        this.width = 30
        this.height = 30
        this.prevY= this.y

        this.vy = -20

        //Image
        this.img = new Image()
        this.img.src = './assets/img/CollectableObject/Life.png'
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