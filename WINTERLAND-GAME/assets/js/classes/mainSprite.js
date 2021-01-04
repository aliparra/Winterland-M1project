class MainSprite{

    constructor(ctx,x,y){
        this.ctx=ctx

        this.width = 80
        this.height = 130

        this.initialWidth = this.width
        this.initialHeight = this.height

        //x properties
        this.maxX = 0
        this.x = x
        this.previousX = this.x
        
        
        this.vx = 0


        //y properties
        this.y = y
        this.previousY = this.y
        this.vy = 0


        //SPRITE MOVEMENTS
        this.movements = {
            right: false,
            left: false,
            up: false,
            run: false,
        }

        this.status = {
            leftSide: false,
            rightSide: true
        }

        this.jumpProperties = {
            isJumping: false,
            jumpMax: -11,
            jumpChrono: 0,
            jumpInterval: undefined
        }

        //POSSIBLE COLLISIONS
        this.collisions = {
            top: false,
            bottom: false,
            left: false,
            right: false,
            bottomBox: false
        }
        
         //ATTACK
         //Jumpattack
         this.jumpAttack = MAINATTACK
         this.jumpAttackCounter= 0 //Controls the number of collisions

         //Snowball attack
         this.snowballs = []
         this.canFire = true

        //HEALTH
         this.health = MAINHEALTH
         this.isDead = false

         //INVENTARY

         this.inventary = {
             heart: false,
             apple: false,
             bubble: true
         }
         //SPRITE SOUND
         //sounds
        this.sounds = {
            jump: new Audio('./assets/sounds/jump2.wav'),
            shoot: new Audio('./assets/sounds/snowballShoot.mp3'),
            gameOver: new Audio('./assets/sounds/gameOver.wav'),
            getCoin: new Audio('./assets/sounds/coin.wav'),
            getHeart: new Audio('./assets/sounds/heart2.wav'),
            getApple: new Audio('./assets/sounds/heart.mp3')
           
        } 

        this.sounds.jump.volume = 0.1
        this.sounds.shoot.volume = 0.1
        this.sounds.gameOver.volume = 0.1
        this.sounds.getCoin.volume = 0.1
        this.sounds.getHeart.volume = 0.2
        this.sounds.getApple.volume = 0.8
        
        this.stopSound = false

        //SPRITE IMAGES

        //SPRITE SHEET
        this.sprite = new Image()
        this.sprite.src = './assets/img/mainsprite/fixed_main_sprite.png'
        this.sprite.isReady = false

        this.sprite.horizontalFrames = 10
        this.sprite.verticalFrames = 12

        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0

        this.sprite.drawCount = 0

        this.sprite.onload = () => {
            this.sprite.isReady = true

            this.sprite.frameWidth = this.sprite.width / this.sprite.horizontalFrames //To know the widht of every frame
            this.sprite.frameHeight = this.sprite.height / this.sprite.verticalFrames //To know the height of every frame

            this.width = this.sprite.frameWidth
            this.height = this.sprite.frameHeight // This give me the option of multiplying the value if I want 
        }

       
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

         //Let me paint less times than original frames
         this.sprite.drawCount++
        this.animate()

        //Change mainSprite Size with heart
        if(this.inventary.apple){
            this.height = this.initialHeight / 1.5
            this.width = this.initialWidth / 1.5
        }else if(this.inventary.heart){
            this.height = this.initialHeight * 1.2
            this.width = this.initialWidth * 1.2
        }else {
            this.height = this.initialHeight
            this.width = this.initialWidth
        }
        
        //Snowballs
        this.snowballs.forEach(snowball => snowball.draw())   

    }

    //ANIMATIONS
    animate(){
        if(this.movements.run && this.movements.right){
            this.animateRunR()  
        }else if(this.movements.run && this.movements.left){
            this.animateRunL()
        }
        else if(this.movements.right && this.jumpProperties.isJumping ){
            this.animateJumpR()
            
        }
        else if(this.movements.left && this.jumpProperties.isJumping ){
            this.animateJumpL()
            
        }
        else if(this.movements.right ){
            this.animateWalkR()
        }
        else if(this.movements.left ){
            this.animateWalkL()
        }
        else if(this.jumpProperties.isJumping){
            this.animateJumpR()
            
        }else if(this.isDead && this.movements.left){
            this.animateDieL()
        }
        else if(this.isDead){
            this.animateDieR()
        }
        else{
            this.resetAnimation()  
        }

        
    }

    resetAnimation(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
            if(this.status.rightSide){
            this.sprite.verticalFrameIndex = 9 }else{
                this.sprite.verticalFrameIndex = 3
            }
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    }

   

    animateWalkR(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
        this.sprite.verticalFrameIndex = 6
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0  
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    }

    animateWalkL(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
        this.sprite.verticalFrameIndex = 0
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    }

     animateRunR(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
        this.sprite.verticalFrameIndex = 7
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    
    }

    animateRunL(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
        this.sprite.verticalFrameIndex = 1
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    
    }

    animateJumpR(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
            
            this.sprite.verticalFrameIndex = 8
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    } 

    animateJumpL(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
            
            this.sprite.verticalFrameIndex = 2
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    } 

    animateDieL(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
            
            this.sprite.verticalFrameIndex = 5
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    } 

    animateDieR(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
            
            this.sprite.verticalFrameIndex = 11
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    } 



    //KEY EVENTS - MOVEMENTS
    onKeyEvent(event){
        const status= event.type === 'keydown'
        switch(event.keyCode){
            case KEY_UP:
                this.movements.up = status
                break;
            case KEY_RIGHT:
                this.movements.right = status
                break;
            case KEY_LEFT:
                this.movements.left = status
                break;
            case KEY_RUN:
                this.movements.run = status
                break;
            case KEY_ATTACK:
                if(this.canFire && this.inventary.bubble){
                this.sounds.shoot.play()
                this.snowballs.push(
                    new Snowball(this.ctx, this.x + this.width/2, this.y+80))
                    this.canFire = false
                    setTimeout(()=> { this.canFire = true}, 1000)
                }
                

            default:
                break;
        }
    }

    move(){
        //console.log(this.x)
        //GRAVITY AND GRAVITY LIMITS
        this.vy += GRAVITY
        if(this.vy>=MAXGRAVITY){
            this.vy=MAXGRAVITY
        }
        
        //MOVEMENTS

        this.previousX = this.x
        this.previousY = this.y

        if(this.maxX < this.previousX){
            this.previousX > this.x ? this.maxX = this.previousX : this.maxX = this.x
        }

        //RIGHT-LEFT WALK AND RUN
        if(this.movements.right){
           this.movements.run ? this.vx = SPEED*2 : this.vx = SPEED
           this.status.leftSide = false
            this.status.rightSide = true
        }else if(this.movements.left){
            
            this.movements.run ? this.vx = -SPEED*2 : this.vx = -SPEED 
            this.status.leftSide = true
            this.status.rightSide = false
        }


        //JUMP
        if(this.movements.up && !this.jumpProperties.isJumping){
            this.jumpProperties.isJumping = true
            this.vy = this.jumpProperties.jumpMax
            this.sounds.jump.play()

            this.jumpProperties.jumpInterval = setInterval(() => {
                this.jumpProperties.jumpChrono++
            },8) 

        }else if(this.jumpProperties.isJumping && !this.movements.up && this.jumpProperties.jumpChrono >= 120 || this.collisions.up ){
            this.jumpProperties.isJumping = false
            clearInterval(this.jumpProperties.jumpInterval)
            this.jumpProperties.jumpChrono = 0
        }

        //Moving x and y postion adding speed
        this.x += this.vx
        this.y += this.vy

        //Don't move over the limits SIDE COLLISIONS
        if(this.x <= WORLDSTART){
            this.x = WORLDSTART
        }
        if(this.x >= WORLDEND){
            this.x = WORLDEND 
        }

         if(this.y >= this.ctx.canvas.height-this.height){
            this.death()
        } 

        //ATTACK

        if(this.status.leftSide){
        this.snowballs.forEach(snowball => snowball.moveL())}
        else
        {
            this.snowballs.forEach(snowball => snowball.moveR()) 
        }
        
    }

    //PLATFORMS COLLISIONS
    collidesWith(element){
        //LEFT COLLISION
        if( this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x + this.width >= element.x &&
            this.x < element.x && 
            this.previousX +  this.width < element.x)
            {
                //console.log('left')
                this.x = element.x - this.width - 1
                this.vx = 0
                this.x = element.x - this.width - 1
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
                this.x  = element.x + element.width + 1
                this.vx = 0
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
                this.vx = 0
                this.collisions.top = true
                this.jumpattackCounter = 0

                if(element instanceof MovePlatform){ //Only applies to instances of MovePlatform class 
                    this.vx = element.vx
                }
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

    //AIR PLATFORM COLLISION

    collidesWithAp(element,elementx){
        //LEFT COLLISION
        if( this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x + this.width >= elementx &&
            this.x < elementx && 
            this.previousX +  this.width < elementx)
            {
                //console.log('left')
                this.x = elementx - this.width - 1
                this.vx = 0
        
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
                this.x  = elementx + element.width + 1
                this.vx = 0
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
                this.vx = 0
                this.collisions.top = true
                this.jumpattackCounter = 0
        }
         //BOTTOM COLLISION
        else if(
            this.y <= element.y + element.height && 
            this.y >= element.y && 
            this.x + this.width >= elementx && 
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
    //MYSTERYBOX COLLISION
    boxCollision(element,prize){
        //LEFT COLLISION
        if( this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x + this.width >= element.x &&
            this.x < element.x && 
            this.previousX +  this.width < element.x)
            {
                //console.log('left')
                this.collisions.left = true
                this.x = element.x - this.width - 1
                this.vx = 0
                
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
                this.x  = element.x + element.width + 1
                this.vx = 0
                
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
                this.vx = 0
                this.collisions.top = true
                
                this.jumpattackCounter = 0
                

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
                this.vy = 0   
                this.vx = 0
                element.collisionStatus = true
                element.move()
                element.showPrize(prize)
                
            }  
        else{
            this.collisions.top = false
            this.collisions.bottom = false
            this.collisions.left = false
            this.collisions.right = false
            } 
    }


      //HEART, APPLE AND COIN COLLISION

      generalCollision(element){
        if(this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){

                if(element instanceof Heart){
                    this.y -= 30
                    this.inventary.heart= true
                    this.sounds.getHeart.play()
                    element.x = undefined
                }

                if(element instanceof Apple){
                    this.y -= 30
                    this.inventary.apple= true
                    setTimeout(()=> { 
                        this.inventary.apple = false 
                    },20000)
                    this.sounds.getApple.play()
                    element.x = undefined
                }
                if(element instanceof Bubble){
                    this.inventary.bubble= true
                    setTimeout(()=> { 
                        this.inventary.bubble = false 
                    },20000)
                    this.sounds.getApple.play()
                    element.x = undefined
                }
                if(element instanceof Coin){
                    this.sounds.getCoin.play()
                    return true
                }else{
                    return false
                }

                
                
            }
        
    }
    //GENERIC COLLISION

   /*  coinCollision(element){
        if(this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){
                this.sounds.getCoin.play()
                return true
            }
        return false
    } */

    //CHECK HEALTH 
    healthStatus(){
        if(this.health <= 0){
            this.isDead = true
            this.death()
            return true
        }else{
            return false
        }
    }
   
    //DEATH
    death(){
           this.x=undefined
           if(!this.stopSound){
           this.sounds.gameOver.play()}
           this.stopSound = true
           this.ctx.fillStyle = 'rgba(120, 120, 120, 0.5)',
           this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),
           this.ctx.fillStyle = "rgb(0,0,0)",
           this.ctx.font = '100px Arial bold',
           this.ctx.fillText('You loose',this.ctx.canvas.width/2 - 200,this.ctx.canvas.height/2 ,500)
           
    }

    spritePosition(){
        this.ctx.save()
        this.fillStyle= 'red'
        this.ctx.font = '18px Arial'
        this.ctx.fillText(` ${this.x}`,this.x, this.y + 20)
        this.ctx.restore()
        this.ctx.fillText(` ${Math.floor(this.y)}`,this.x, this.y + 40) 
    }
        
}