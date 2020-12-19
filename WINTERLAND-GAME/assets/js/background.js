class Background{
    constructor(ctx){
        this.ctx=ctx
        //Background x and y position
        this.x= 0
        this.y=0

        //Canvas dimensions
        this.width = this.ctx.canvas.width
        this.height= this.ctx.canvas.height

        //Background movement speed
        this.vx= -SPEED

        //Background image
        this.img = new Image()
        this.img.src = './assets/img/Background_01.png'
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }
        //Background movement controls
        this.movements = {
            right: false,
            left:false
        }

        //Background position counter
        this.xPositionCounter=0;
    }

    isReady(){
        return this.img.ready
    }

    draw(){
        if(this.isReady()){
        
            this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height) //Draw first image
            this.ctx.drawImage(this.img,this.x + this.width, this.y, this.width,this.height) //Draw second image 
            
        }
    }

    move(){
        
        if(this.x + this.width<=0){
            this.xPositionCounter++
            this.x=0
        }
       //Moving based on keypress
        if(this.movements.right){
            this.x +=this.vx
        }

        if(this.movements.left){
            
            if(this.x >=0){
                this.x=0
            }else{
                this.x -=this.vx   
            }
        }

       /*  console.log(`counter: ${this.xPositionCounter} and x: ${this.x}`) */

        

    }

    onKeyEvent(event){
        const status = event.type === 'keydown'

        switch(event.keyCode){
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
}