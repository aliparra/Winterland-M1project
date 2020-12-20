class BasicEnemy{
    
    constructor(ctx,x,y,distance){

        this.ctx = ctx,
        this.x = x,
        this.y = y,
        this.distance = distance + this.x
        
        this.height = 50,
        this.width = 130,

        this.vx = LOWSPEED
        this.vy = 0
        //Auxiliar properties to move from one side to another
        this.init =this.x
        this.changeDir= undefined
    }

    draw(){
        this.ctx.save()
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x,this.y,this.width,this.height)
        this.ctx.restore()
    }

    move(){
        this.vy += GRAVITY
        
        //Moving from one side to another from initial position to provided distance
        if(this.x === this.distance ){
            this.changeDir = false
        }else if (this.x === this.init ){
            this.changeDir = true
        }

        if(this.changeDir){
            this.x += this.vx
        }else if(this.changeDir === false){
            this.x -= this.vx
        }

        
    }

    death(){
        this.x= undefined

    }

    
    
}