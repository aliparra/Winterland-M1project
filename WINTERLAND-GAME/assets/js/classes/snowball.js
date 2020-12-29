class Snowball extends GenericClass{

    constructor(ctx,x,y,maxY){
        super(ctx,x,y)

        
        //Size
        this.width = 20
        this.height = 20

        this.vx = 15
        this.vy = 0

        //Image
        this.img = new Image()
        this.img.src = './assets/img/Environment/Rock_05.png'
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }

        //Status
        this.attack = MAINATTACK
        
    }

    isReady(){
        return this.img.ready
    }

    draw(){
        if(this.isReady()){
            
        this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height)   
        }
    }

    move(){
        this.x += this.vx
        this.y += this.vy
        this.vy += GRAVITY
        if(this.vy>=MAXGRAVITY){
            this.vy=MAXGRAVITY
        }
    }

    



}