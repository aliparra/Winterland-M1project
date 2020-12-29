class MisteryBox extends GenericClass{

    constructor(ctx,x,y){
        super(ctx,x,y)
        this.prevY = this.y
        this.width = 100
        this.height = 100

        this.vx = 0
        this.vy = -20
        this.maxVy= 60
        this.collisionStatus = false

        this.img = new Image()
        this.img.src = './assets/img/Platformer/Bonus.png'
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }

        this.img2 = new Image()
        this.img2.src = './assets/img/Platformer/Caramel.png'
        

    }

    isReady(){
        return this.img.ready
    }

    

    draw(){
        console.log(this.collisionStatus)
        if(this.collisionStatus){
            this.ctx.drawImage(this.img2,this.x,this.y,this.width,this.height)
            console.log('interrogacion')
        }else if(this.collisionStatus === false && this.isReady())
        {
            this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height) 
            console.log('sin interr')
    
        }
        
    }

    //NEEDS TO BE FIXED NOT WORKING YET
    move(){
        console.log('move!')
        if(this.vy<=this.maxVy && this.y>= this.prevY){
        this.y += this.vy}
        setTimeout(() => {
           this.y=this.prevY 
        }, 200);
    }

}