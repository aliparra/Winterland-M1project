class Coin extends GenericClass{

    constructor(ctx,x,y){
        super(ctx,x,y)

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

        //Status
        this.collisionStatus = false

        //Points
        this.coinsCounter = 0
    }

    

    draw(){
        this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }

    collision(element){
        this.collisionStatus = super.collision(element)
        if(this.collisionStatus){
            this.coinsCounter++
            this.x = undefined
        }
    }

    
}