class MainSprite{

    constructor(ctx,x,y){
        this.ctx=ctx

        this.width=0
        this.height=0

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

        this.jumpProperties = {
            isJumping: false,
            jumpMax: -13,
            jumpChrono: 0,
            jumpInterval: undefined
        }

        //POSSIBLE COLLISIONS
        this.collisions = {
            top: false,
            bottom: false,
            left: false,
            right: false
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

        //SPRITE IMAGES

        //SPRITE SHEET
        this.sprite = new Image()
        this.sprite.src = './assets/img/mainsprite/main_sprite_right.png'
        this.sprite.isReady = false

        this.sprite.horizontalFrames = 10
        this.sprite.verticalFrames = 7

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
        
        //Snowballs
        this.snowballs.forEach(snowball => snowball.draw())   

    }

    animate(){
        if(this.movements.run && this.movements.right){
            this.animateSpriteRunR()
            
        }
        else if(this.movements.right && this.jumpProperties.isJumping){
            this.animateJump()
            
        }else if(this.movements.right){
            this.animateSpriteR()
        }
        else if(this.jumpProperties.isJumping){
            this.animateJump()
            
        }else{
            this.resetAnimation()
            
        }
        
    }

    resetAnimation(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
            
            this.sprite.verticalFrameIndex = 5
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    }

    animateSpriteR(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
        this.sprite.verticalFrameIndex = 0
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
                console.log('stop')
            }else{
                console.log('go')
                this.sprite.horizontalFrameIndex++
            }
        }
    }

     animateSpriteRunR(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
        this.sprite.verticalFrameIndex = 1
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    
    }

    animateJump(){
        if(this.sprite.drawCount % MOVEMENT_FRAMES === 0){
            console.log(this.sprite.drawCount)
            this.sprite.verticalFrameIndex = 2
            if(this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    } 



    //Make true or false every movement if the proper key was pressed
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
                if(this.canFire){
                this.snowballs.push(
                    new Snowball(this.ctx, this.x + this.width, this.y))
                    this.canFire = false
                    setTimeout(()=> { this.canFire = true}, 1000)
                }
                

            default:
                break;
        }
    }

    move(){
        
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
        }else if(this.movements.left){
            
            this.movements.run ? this.vx = -SPEED*2 : this.vx = -SPEED 
        }else{
            this.vx=0
        }

        //JUMP
        if(this.movements.up && !this.jumpProperties.isJumping){
            this.jumpProperties.isJumping = true
            this.vy = this.jumpProperties.jumpMax

            this.jumpProperties.jumpInterval = setInterval(() => {
                this.jumpProperties.jumpChrono++
            },10) 

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
            this.y = this.ctx.canvas.height-this.height
        }

        //ATTACK

        
        this.snowballs.forEach(snowball => snowball.move())
        


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
                this.x = elementx - this.width - 1
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

    //GENERIC COLLISION

    collision(element){
        if(this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){

                return true
            }
        return false
    }

   
    //DEATH
    death(){
           this.x=undefined
    }
        
}
