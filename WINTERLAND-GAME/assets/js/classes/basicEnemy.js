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
        this.changeDir = undefined

        //COLLISION 
        this.collisionStatus = {
            up: false,
            down: false, 
            left: false,
            right: false
        }
    }

    draw(){
        this.ctx.save()
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x,this.y,this.width,this.height)
        this.ctx.restore()
    }

    move(){
        this.vy += GRAVITY
        if(this.vy>=MAXGRAVITY){
            this.vy=MAXGRAVITY
        }
        
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

    enemyCollision(element){
        //RIGHT COLLISION
        if(true ){
                
            this.collisionStatus.right = true
       
        }else if( true){//LEFT COLLISION
              

            this.collisionStatus.left = true

         //TOP COLLISION          
        }else if(true){
            
            this.collisionStatus.top = true
        }
        
        else if(true ){//BOTTOM COLLISION

            this.collisionStatus.bottom = true
        
            
        }else{
            this.collisionStatus.left = false
            this.collisionStatus.right = false
            this.collisionStatus.top = false
            this.collisionStatus.bottom = false
        }
        

        //console.log(this.collisionStatus.top)
        //console.log(this.collisionStatus.right)
        //console.log(this.collisionStatus.bottom)
        //console.log(this.collisionStatus.left)
              
    }

   

    

    
    
}