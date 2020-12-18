class MainSprite{

    constructor(ctx,x,y){
        this.ctx=ctx
        this.width=100
        this.height=20

        //x properties
        this.x=x
        this.minX=0
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

        this.isJumping = false;
    }

    draw(){
        this.ctx.save()
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x,this.y,this.width,this.height)
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
                console.log(status)
                break;
            case KEY_LEFT:
                this.movements.left = status
                break;
        
        default:
            break;
        }
    }

    move(){
        //Left-right movements
        if(this.movements.right){
            console.log()
           this.vx=SPEED
        }else if(this.movements.left){
            this.vx =-SPEED
        }else{
            this.vx=0
        }

        //Jump movement
        if(this.movements.up &&!this.isJumping){
            console.log('hi')
            this.isJumping = true
            this.vy+= -10
        }else if(this.isJumping){
            this.vy += GRAVITY
        }else{
            this.vy=0
        }

        //Moving x and y postion adding speed
        this.x +=this.vx
        this.y +=this.vy

        //Don't move over the limits
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

    borderCollision(){
        
    }
}