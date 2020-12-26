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

    isReady(){
        return this.img.ready
    }

    draw(){
        if(this.isReady()){
        this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height)   
        }
    }

   counterDraw(sprite, counter){
       if(this.isReady()){
            if(sprite.x <=600){
            this.ctx.drawImage(this.img, this.ctx.canvas.width - 200 ,this.y,this.width,this.height)
            this.ctx.save()
            this.ctx.font = '18px Arial'
            this.ctx.fillText(` ${counter}`, this.ctx.canvas.width - 170, this.y + 20)
            
            }
            else{
            this.ctx.drawImage(this.img, sprite.x + 400 ,this.y,this.width,this.height )
            this.ctx.font = '18px Arial'
            this.ctx.fillText(` ${counter}`, sprite.x + 430, this.y + 20)
            }
        }
    }

  

 
    
}