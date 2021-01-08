
class FlyingEnemy extends BasicEnemy{
    constructor(ctx,x,y,distance,delay){

        super(ctx,x,y)

        //Auxiliar properties to move from one side to another
        this.distance = distance + this.y
        this.init = this.y
        this.status = {
            up: false,
            down: true,
            death: false
        }

        //X and y speed

        this.vx= 0
        this.vy= 2

        //Direction

        this.delay = delay
        //Collisions 
        this.collisions = {
            sprite: false,
            snowball: false
        }
        //SIZE
        this.width = 2
        this.height = 2

        //ATTACK
        this.attack = MAINATTACK

          //SPRITE SHEET
          this.sprite = new Image()
          this.sprite.src = './assets/img/enemySprite/fly-enemy-sprite-1.png'
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
  
              this.width =this.sprite.frameWidth
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
        if(this.status.up && this.status.death){
            this.animateDeathR()
        }else if(this.status.down && this.status.death){
            this.animateDeathL()
        }else if(this.status.up){
            this.animateWalkR()
        }else if(this.status.down){
            this.animateWalkL()
        }
    }
    move(){


        //MOVEMENTS

        this.previousX = this.x
        this.previousY = this.y
        
        //Moving from one side to another from initial position to provided distance
        if(this.y === this.distance ){
            this.changeDir = false
            this.status.up = false
            this.status.down = true
        }else if (this.y === this.init ){
            this.changeDir = true
            this.status.up = true
            this.status.down = false
        }
        
        //CHANGE Y POSITION

        setTimeout(() => { if(this.changeDir){
            this.y += this.vy
        }else if(this.changeDir === false){
            this.y -= this.vy
        }},this.delay)
       
        
        
    }

    //SPRITE - FLYING ENEMY COLLISION
    collisionEnemy(element){
        
        if(!this.status.death){
             //LEFT COLLISION
             if( element.y + element.height >= this.y &&
                 element.y <= this.y + this.height &&
                 element.x + element.width >= this.x &&
                 element.x < this.x && 
                 element.previousX +  element.width <= this.x)
                 {
 
                     //console.log('left')
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
                     
                    element.x = this.x + this.width + 50
 
                    if(!element.inventary.heart){
                        console.log('entered')
                        element.health -= this.attack
                        this.sounds.kill.play()
                        
                    }else{
                        element.inventary.heart = false
                        this.sounds.hurt.play()
                        
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