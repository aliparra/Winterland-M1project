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

        //posible movements
        this.movements = {
            right: false,
            left: false,
            up: false
        }

        this.collisions ={
            top: false,
            bottom: false,
            left: false,
            right: false
        }

        this.isJumping = false;

        //possible collisions
        this.collisionStatus = false
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
        
            default:
                break;
        }
    }

    move(){
        //
        this.vy += GRAVITY
        if(this.vy>=20){
            this.vy=20
        }
        //Left-right movements
        if(this.movements.right){
           this.vx=SPEED
        }else if(this.movements.left){
            this.vx =-SPEED
        }else{
            this.vx=0
        }

        //Jump movement
        if(this.movements.up && !this.isJumping){
            this.isJumping = true
            this.vy = -10
        }

        

        //Moving x and y postion adding speed
        this.x += this.vx
        this.y += this.vy

        //Don't move over the limits SIDE COLLISIONS
        if(this.x>= this.maxX){
            this.x=this.maxX
        }else if(this.x<=this.minX){
            this.x=this.minX
        }

        if(this.y>this.maxY){
            this.isJumping=false
            this.y= this.maxY
            this.vy=0
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

        }else if(

            this.x + this.width >= element.x &&
            this.x <= element.x + element.width &&
            this.y + this.height >= element.y &&
            this.y + this.height < element.y + element.height

        ){
             this.y=element.y- this.height 
            this.isJumping = false 
            this.collisions.top = true
        }
              
    }
        
}

