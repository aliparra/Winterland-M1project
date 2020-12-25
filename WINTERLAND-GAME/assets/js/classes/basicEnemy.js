class BasicEnemy{
    
    constructor(ctx,x,y,distance){

        this.ctx = ctx

        //x properties
        this.x = x
        this.vx = 1
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
  
    collisionEnemy(element){
        console.log(`enemy: ${this.x} sprite: ${element.x}`)
        //LEFT COLLISION
        if( element.y + element.height >= this.y &&
            element.y <= this.y + this.height &&
            element.x + element.width >= this.x &&
            element.x < this.x && 
            element.previousX +  element.width <= this.x)
            {
                console.log('left')
                element.health -=this.attack
                if(element.health<=0){
                    element.death()
                }
                
       
            }
        //RIGHT COLLISION
        else if( 
            element.y + element.height >= this.y &&
            element.y <= this.y + this.height &&
            element.x <= this.x + this.width &&
            element.x + element.width > this.x + this.width &&
            element.previousX >= this.x + this.width)
            {
                console.log('right')
                element.health -= this.attack
    
                if(element.health <= 0){
                    element.death()
                }
        }
        //TOP COLLISION
        else if( 
            element.y + element.height >= this.y &&
            element.y + element.height <= this.y + this.height &&
            element.x + element.width >= this.x &&
            element.x <= this.x + this.width &&
            element.y < this.y && 
            element.previousY + element.height < this.y) 
            {
                console.log('top')
                element.vy = -5
                element.attackCounter++
                if(element.attackCounter === 1){
                    this.health -= element.attack 
                }
                if(this.health<=0){
                    this.death()
                }
                
        }
         //BOTTOM COLLISION
        else if(
            element.y <= this.y + this.height && 
            element.y >= this.y && 
            element.x + element.width >= this.x && 
            element.x <= this.x + this.width &&
            element.y + element.height > this.y + this.height &&
            element.previousY > this.y + this.height)
            {
                console.log('bottom')
                element.health -=this.attack
                if(element.health<=0){
                    element.death()
                }
            }  
        else{
            element.collisions.top = false
            element.collisions.bottom = false
            element.collisions.left = false
            element.collisions.right = false
            } 
    }

    death(){
        this.x = undefined
    }
    
}