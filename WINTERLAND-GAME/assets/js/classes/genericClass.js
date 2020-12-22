class GenericClass{

    constructor (ctx, x, y,){
        this.ctx = ctx

        this.x = x
        this. y =y

        this.width= 100
        this.height = 100

        this.vx = 0
        this.vy = 0

    }

    isReady(){
        return this.img.ready
    }
    draw(){
        
        this.ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    collision(element){
        if(this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){

                return true
            }
        return false
    }

    move(){
        //GRAVITY
        this.vy += GRAVITY
        if(this.vy>=MAXGRAVITY){
            this.vy=MAXGRAVITY
        }
        //CHANGE POSITION BASED ON V
        this.y += this.vy
        this.x += this.vx
    }
}