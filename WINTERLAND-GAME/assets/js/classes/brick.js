class Brick extends MisteryBox{

    constructor(ctx,x,y){
        super(ctx,x,y)
       

        this.img = new Image()
        this.img.src = './assets/img/Platformer/Brick_01.png'
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }

        this.img2 = new Image()
        this.img2.src = './assets/img/Platformer/Brick_02.png'
        
        //Sounds
        this.sounds = {
            hit: new Audio('./assets/sounds/brick.wav'),    
        } 

        this.stopSound = false
        this.sounds.hit.volume = 0.4
    }

    isReady(){
        return this.img.ready
    }

    

    draw(){
        
        if(this.collisionStatus){
            this.ctx.drawImage(this.img2,this.x,this.y,this.width,this.height)
            
        }else if(this.collisionStatus === false && this.isReady())
        {
            this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height) 
            
    
        }
        
    }

   
    move(){
        console.log('move!')
        if(this.vy<=this.maxVy && this.y>= this.prevY){
        this.y += this.vy}
        setTimeout(() => {
           this.y=this.prevY 
        }, 200);
        if(!this.stopSound){
            this.sounds.hit.play()
        }

    }

    showPrize(prize){
        if(!this.prizeOut){

        if(this.vy<=this.maxVy && prize.y>= prize.prevY){
                prize.y -=100
                prize.y += this.vy}
                 setTimeout(() => {
                   prize.y=this.prevY - 50
                }, 200); 
        //prize.y -=100
        this.prizeOut = true
        }
    }
}