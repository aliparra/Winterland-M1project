class BasicEnemy{
    
    constructor(ctx,x,y,distance){

        this.ctx = ctx

        //x properties
        this.x = x
        this.vx = LOWSPEED
        this.previousX = this.x

        //y properties
        this.y = y
        this.vy = 0
        this.previousY = this.y

        this.distance = distance + this.x
        
        this.height = 50
        this.width = 130

        
        
        //Auxiliar properties to move from one side to another
        this.init =this.x
        this.changeDir = undefined

        //COLLISION 
        this.collisions = {
            top: false,
            bottom: false, 
            left: false,
            right: false,
            
        }

        //ATTACK
        this.attack = 100

        //HEALTH

        this.health= 100
    }

    draw(){
        this.ctx.save()
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x,this.y,this.width,this.height)
        this.ctx.restore()
    }

    move(){
       /*  this.vy += GRAVITY
        if(this.vy>=MAXGRAVITY){
            this.vy=MAXGRAVITY
        } */
        
        
        
        //MOVEMENTS

        this.previousX = this.x
        this.previousY = this.y
        
        //Moving from one side to another from initial position to provided distance
        if(this.x === this.distance ){
            this.changeDir = false
        }else if (this.x === this.init ){
            this.changeDir = true
        }
        //CHANGE X POSITION
        if(this.changeDir){
            this.x += this.vx
        }else if(this.changeDir === false){
            this.x -= this.vx
        }
        //CHANGE Y POSITION
        this.y += this.vy
        
    }
  
    death(){
        this.x = undefined
    }
    
}