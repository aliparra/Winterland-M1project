class MovePlatform{
    constructor(ctx, x, y,w,h, leftLimit, rightLimit,vel){

        this.ctx = ctx

        this.width = w
        this.height = h

        this.leftLimit = leftLimit
        this.rightLimit = rightLimit
        
        this.direction = 'right'   
        
        this.x = x
        this.y = y
    
        this.vx = 1
        this.vel = vel
    
        //image

        this.img = new Image()
        this.img.src = './assets/img/Environment/Icicle_02.png'
        this.ready = false;
        this.img.onload = () => {
            this.img.ready = true
        }
       
    }

    isReady(){
        return this.img.ready
    }

    draw(){
        if(this.isReady()){
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }
    
    move(){

       if(this.x >= this.rightLimit && this.direction === 'right'){
            this.vx = -this.vel
            this.direction = 'left'
            
        }
        else if(this.x <= this.leftLimit && this.direction === 'left'){
            this.vx = this.vel
            this.direction = 'right'
        }
        
        //update position  
        this.x += this.vx
    }
}