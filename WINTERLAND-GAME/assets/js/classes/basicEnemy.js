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

        
        this.height = 0
        this.width = 0

        
        
        //Auxiliar properties to move from one side to another
        this.distance = distance + this.x
        this.init =this.x
        this.changeDir = undefined
        this.status = {
            left: false,
            right: true,
            death: false
        }

        //COLLISION 
        this.collisions = {
            top: false,
            bottom: false, 
            left: false,
            right: false,   
        }

        //ATTACK
        this.attack = MAINATTACK

        //HEALTH

        this.health= MAINHEALTH

        //SPRITE SHEET
        this.sprite = new Image()
        this.sprite.src = './assets/img/enemySprite/enemy-sprite-1.png'
        this.sprite.isReady = false

        this.sprite.horizontalFrames = 11
        this.sprite.verticalFrames = 4

        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0

        this.sprite.drawCount = 0

        this.sprite.onload = () => {
            this.sprite.isReady = true

            this.sprite.frameWidth = this.sprite.width / this.sprite.horizontalFrames //To know the widht of every frame
            this.sprite.frameHeight = this.sprite.height / this.sprite.verticalFrames //To know the height of every frame

            this.width = this.sprite.frameWidth
            this.height = this.sprite.frameHeight  
        }

        //SOUNDS

        this.sounds = {
            die: new Audio('./assets/sounds/killEnemy.wav'),
            kill: new Audio('./assets/sounds/blades.wav'),
            hurt: new Audio('./assets/sounds/hurt.mp3')   
        } 
        this.sounds.die.volume = 0.1
        this.sounds.kill.volume = 0.3
        this.sounds.hurt.volume = 0.3
    }

    isReady(){
        return this.sprite.isReady
    }

    draw(){
        if(this.isReady()){
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height

            ) 
        }
        this.sprite.drawCount++
        this.animate()
    }

    animate(){
        if(this.status.right && this.status.death){
            this.animateDeathR()
        }else if(this.status.left && this.status.death){
            this.animateDeathL()
        }else if(this.status.right){
            this.animateWalkR()
        }else if(this.status.left){
            this.animateWalkL()
        }
    }

    animateWalkR(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
            
            this.sprite.verticalFrameIndex = 0
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    }

    animateWalkL(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
            
            this.sprite.verticalFrameIndex = 1
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    }

    animateDeathR(){
        if(this.sprite.drawCount % SLOW_MOVEMENT_FRAMES === 0){
            
            this.sprite.verticalFrameIndex = 2
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    }

    animateDeathL(){
        if(this.sprite.drawCount % SLOW_MOVEMENT_FRAMES === 0){
            
            this.sprite.verticalFrameIndex = 3
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
        
    }
    move(){

        //GRAVITY 

         this.vy += GRAVITY
        if(this.vy>=MAXGRAVITY){
            this.vy=MAXGRAVITY
        }  
        
        //MOVEMENTS

        this.previousX = this.x
        this.previousY = this.y
        
        //Moving from one side to another from initial position to provided distance
        if(this.x === this.distance ){
            this.changeDir = false
            this.status.right = false
            this.status.left = true
        }else if (this.x === this.init ){
            this.changeDir = true
            this.status.right = true
            this.status.left = false
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

    //PLATFORMS ENEMY COLLISIONS
    collidesWith(element){

        //LEFT COLLISION
        if( this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x + this.width >= element.x &&
            this.x < element.x && 
            this.previousX +  this.width < element.x)
            {
                //console.log('left')
                this.collisions.left = true
       
            }
        //RIGHT COLLISION
        else if( 
            this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x <= element.x + element.width &&
            this.x + this.width > element.x + element.width &&
            this.previousX > element.x + element.width)
            {
                //console.log('right')
                this.collisions.right = true
        }
        //TOP COLLISION
        else if( 
            this.y + this.height >= element.y &&
            this.y + this.height <= element.y + element.height &&
            this.x + this.width >= element.x &&
            this.x <= element.x + element.width &&
            this.y < element.y && 
            this.previousY + this.height < element.y) 
            {
                //console.log('top')
                this.y  = element.y - this.height - 1
                this.vy = 0
                this.collisions.top = true
                this.attackCounter = 0
        }
         //BOTTOM COLLISION
        else if(
            this.y <= element.y + element.height && 
            this.y >= element.y && 
            this.x + this.width >= element.x && 
            this.x <= element.x + element.width &&
            this.y + this.height > element.y + element.height &&
            this.previousY > element.y + element.height)
            {
                //console.log('bottom')
                this.y = element.y + element.height + 1
                this.collisions.bottom = true
                this.vy = 0   
                this.vx = 0
            }  
        else{
            this.collisions.top = false
            this.collisions.bottom = false
            this.collisions.left = false
            this.collisions.right = false
            } 
    }

    //ENEMY - AIR PLATFORMS COLLISION

    collidesWithAp(element,elementx){

        //LEFT COLLISION
        if( this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x + this.width >= elementx &&
            this.x < elementx && 
            this.previousX +  this.width < elementx)
            {
                //console.log('left')
                this.collisions.left = true
       
            }
        //RIGHT COLLISION
        else if( 
            this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x <= elementx + element.width &&
            this.x + this.width > elementx + element.width &&
            this.previousX > elementx + element.width)
            {
                //console.log('right')
                this.collisions.right = true
        }
        //TOP COLLISION
        else if( 
            this.y + this.height >= element.y &&
            this.y + this.height <= element.y + element.height &&
            this.x + this.width >= elementx &&
            this.x <= elementx + element.width &&
            this.y < element.y && 
            this.previousY + this.height < element.y) 
            {
                //console.log('top')
                this.y  = element.y - this.height - 1
                this.vy = 0
                this.collisions.top = true
                this.attackCounter = 0
        }
         //BOTTOM COLLISION
        else if(
            this.y <= element.y + element.height && 
            this.y >= element.y && 
            this.x + this.width >= element.x && 
            this.x <= elementx + element.width &&
            this.y + this.height > element.y + element.height &&
            this.previousY > element.y + element.height)
            {
                //console.log('bottom')
                this.y = element.y + element.height + 1
                this.collisions.bottom = true
                this.vy = 0   
                this.vx = 0
            }  
        else{
            this.collisions.top = false
            this.collisions.bottom = false
            this.collisions.left = false
            this.collisions.right = false
            } 
    }


    //ENEMY-SPRITE COLLISIONS
  
    collisionEnemy(element){
       if(!this.status.death){
            //LEFT COLLISION
            if( element.y + element.height >= this.y &&
                element.y <= this.y + this.height &&
                element.x + element.width >= this.x &&
                element.x < this.x && 
                element.previousX +  element.width <= this.x)
                {

                    console.log('left')
                    element.x = this.x - element.width - 50

                    if(!element.inventary.heart){
                        element.health -= this.attack
                        this.sounds.kill.play()
                        
                    }else{
                        element.inventary.heart = false
                        this.sounds.hurt.play()
                        
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
                    //console.log('right')
                    element.x = this.x + this.width + 50

                    if(!element.inventary.heart){
                        element.health -= this.attack
                        this.sounds.kill.play()
                        
                    }else{
                        element.inventary.heart = false
                        this.sounds.hurt.play()
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
                    
                    element.vy = -5
                    element.jumpAttackCounter++
                    if(element.jumpAttackCounter === 1){
                        this.health -= element.jumpAttack 
                        this.sounds.die.play()
                    }
                    element.jumpAttackCounter = 0
                    if(this.health<=0){
                        
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
                    //console.log('bottom')

                    element.y = this.y + this.height + 20

                    if(!element.inventary.heart){
                        element.health -= this.attack
                        this.sounds.kill.play()
                        
                    }else{
                        element.inventary.heart = false
                        this.sounds.hurt.play()
                        
                    }
                   
                }  
            else{
                element.collisions.top = false
                element.collisions.bottom = false
                element.collisions.left = false
                element.collisions.right = false
                } 

        }
    }

    //ENEMY-SNOWBALLS COLLISIONS

    snowBallCollision(element){
        if(this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){

            //console.log('enemy was attacked')
            this.health -= element.attack
            this.sounds.die.play()
          
        }
        
    }

    healthStatus(){
        if(this.health <= 0){
            this.status.death = true
            this.vx=0
            setTimeout(() => {
                this.x= undefined
            }, 1000);
            
        }
    }

    
    
}