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

    collidesWith(element){
    
        //RIGHT COLLISION
        if( this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x + this.width >= element.x &&
            this.x < element.x && 
            this.previousX +  this.width < element.x)
            {
                console.log('right')
                
                this.collisions.right = true
        
            }
        //LEFT COLLISION
        else if( 
            this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x <= element.x + element.width &&
            this.x + this.width > element.x + element.width &&
            this.previousX > element.x + element.width)
            {
                console.log('left')
                
                this.collisions.left = true
        }
        //BOTTOM COLLISION
        else if( 
            this.y + this.height >= element.y &&
            this.y + this.height <= element.y + element.height &&
            this.x + this.width >= element.x &&
            this.x <= element.x + element.width &&
            this.y < element.y && 
            this.previousY + this.height < element.y) 
            {
                console.log('bottom')
                
                this.collisions.bottom = true
        }
            //TOP COLLISION
        else if(
            this.y <= element.y + element.height && 
            this.y >= element.y && 
            this.x + this.width >= element.x && 
            this.x <= element.x + element.width &&
            this.y + this.height > element.y + element.height &&
            this.previousY > element.y + element.height)
            {
                console.log('top')
                
                this.collisions.top = true
                
            }  
        else{
            this.collisions.top = false
            this.collisions.bottom = false
            this.collisions.left = false
            this.collisions.right = false
            } 
    
    }

   

    

    
    
}