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
        this.prizeOut = false

        this.img = new Image()
        this.img.src = './assets/img/Platformer/Bonus.png'
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }

        this.img2 = new Image()
        this.img2.src = './assets/img/Platformer/Caramel.png'
        this.ready2=false;
        this.img2.onload = () => {
            this.img2.ready2 = true
        }

        //Sound
        this.sounds = {
            misteryBox : new Audio('./assets/sounds/mysterybox.wav')
        }
        this.sounds.misteryBox.volume = 0.2

    }

    isReady(){
        return this.img.ready
    }

    isReady2(){
        return this.img2.ready2
    }

    draw(){
        
        if(this.collisionStatus && this.isReady2()){
            this.ctx.drawImage(this.img2,this.x,this.y,this.width,this.height)
            
        }else if(this.collisionStatus === false && this.isReady())
        {
            this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height) 
            
        }
        
    }

   
    move(){
        //console.log('move!')
        if(this.vy<=this.maxVy && this.y>= this.prevY){
        this.y += this.vy}
        setTimeout(() => {
           this.y=this.prevY 
        }, 200);
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
        this.sounds.misteryBox.play()
        }
    }
}