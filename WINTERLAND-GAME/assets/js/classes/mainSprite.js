class MainSprite{

    constructor(ctx,x,y){
        this.ctx=ctx
        this.width=50
        this.height=70

        //x properties
        this.x=x
        this.minX=100
        this.maxX = this.ctx.canvas.width /2 
        this.vx= 0

        //y properties
        this.y=y
        this.maxY= y
        this.vy=0

        //SPRITE MOVEMENTS
        this.movements = {
            right: false,
            left: false,
            up: false,
            run: false
        }

        this.jumpProperties = {
            isJumping: false,
            jumpMax: -15,
            jumpChrono: 0,
            jumpInterval: undefined
        }

        //POSSIBLE COLLISIONS
        this.collisions ={
            top: false,
            bottom: false,
            left: false,
            right: false
        }

        //AUXILIAR PROPERTIES
        
        

        //SPRITE STATUS
        this.health = 100


    }

    draw(){
        this.ctx.save()
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x,this.y,this.width,this.height)
        this.ctx.restore()
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

        }else if(this.jumpProperties.isJumping && !this.movements.up && this.jumpProperties.jumpChrono >= 115){
            this.jumpProperties.isJumping = false
            clearInterval(this.jumpProperties.jumpInterval)
            this.jumpProperties.jumpChrono = 0
        }
        
        
        

        //Moving x and y postion adding speed
        this.x += this.vx
        this.y += this.vy

        //Don't move over the limits SIDE COLLISIONS
        if(this.x<=this.minX){
            this.x=this.minX
        }

        if(this.y >= this.ctx.canvas.height-this.height){
            this.y = this.ctx.canvas.height-this.height
        }
        


    }

    collidesWith(element){
        //LEFT COLLISION
        if( this.x +this.width >= element.x &&
              this.x < element.x &&
              this.y <= element.y + element.height &&
              this.y + this.height >= element.y){
                
                  this.vx=0
                  this.x=element.x-this.width - 1
                  this.collisions.left = true
       
        }else if( //RIGHT COLLISION
                this.x<=element.x+element.width &&
                this.x + this.width > element.x + element.width &&
                this.y <= element.y + element.height &&
                this.y + this.height >= element.y){

                this.vx=0
                this.x= element.x + element.width + 1
                this.collisions.right = true

        }else if( //TOP COLLISION

            this.x + this.width >= element.x &&
            this.x <= element.x + element.width &&
            this.y + this.height >= element.y &&
            this.y + this.height < element.y + element.height

        ){
            this.y=element.y- this.height 
            this.isJumping = false 
            this.collisions.top = true
        }
        
        else if(
            this.x + this.width >= element.x &&
            this.x <= element.x + element.width &&
            this.y <= element.y + element.height &&
            this.y > element.y
        ){
            this.y = element.y + element.height 
            this.collisions.bottom = true
        }    
              
    }

    death(){
           this.x=undefined
    }
        
}

