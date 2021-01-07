class Light extends GenericClass{

    constructor(ctx,x,y){
        super(ctx,x,y)

        //Size
        this.width = 70
        this.height = 70
        this.prevY= this.y

        this.vy = -20

        //Image
        this.img = new Image()
        this.img.src = './assets/img/CollectableObject/Light.png'
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