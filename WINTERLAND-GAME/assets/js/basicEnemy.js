class BasicEnemy{
    
    constructor(ctx,x,y,distance){

        this.ctx = ctx,
        this.x = x,
        this.y = y,
        this.distance = distance

        this.height = 50,
        this.width = 100,

        this.vx = LOWSPEED
    
        this.vy = 0

        
    }

    draw(){
        this.ctx.save()
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x,this.y,this.width,this.height)
        this.ctx.restore()
    }

    move(){
        this.vy += GRAVITY
        this.x += this.vx
        
        this.drawInterval = setInterval(()=>{
            console.log(this.x)
            this.x -=this.vx
            
            if(this.x<=0){
                this.x=0
                this.x +=this.vx
            }
            
        }, 5000)

        
    }

    death(){
        this.x= undefined
        
    }

    
    
}