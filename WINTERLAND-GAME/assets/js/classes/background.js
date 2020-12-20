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
        this.img.src = './assets/img/Background/Background_01.png'
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }
  
    }

    isReady(){
        return this.img.ready
    }

    draw(){
        if(this.isReady()){
        
            this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height) //Draw first image
            this.ctx.drawImage(this.img,this.x + this.width, this.y, this.width,this.height) //Draw second image 
            this.ctx.drawImage(this.img,this.x-this.width,this.y,this.width,this.height)
            
        }
    }

    move(character){
        
        //RIGHT MOVEMENT
        if(character.movements.right && character.x >= character.maxX){
            
            character.movements.run ? this.x += this.vx*2 : this.x += this.vx
            if(this.x + this.width <= 0){
                this.x = 0
            }
        //LEFT MOVEMENT
        }else if(character.movements.left && character.x>100){
            character.movements.run ? this.x -= this.vx*2 : this.x -= this.vx

            if(this.x > this.width){
                this.x = 0
            }
        }
    }

    quickMove(){
        
        if(character.movements.right){
            this.x += this.vx*2

            if(this.x + this.width <= 0){
                this.x = 0
            }
        }

    }


}