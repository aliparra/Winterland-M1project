class Coin extends GenericClass{

    constructor(ctx,x,y){
        super(ctx,x,y)

        this.prevY= this.y
        //Size
        this.width = 30
        this.height = 30

        //Image
        this.img = new Image()
        this.img.src = './assets/img/CollectableObject/Coin_01.png'
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