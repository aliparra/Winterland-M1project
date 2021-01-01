class Spike extends GenericClass{

    constructor(ctx,x,y,realx){
        super(ctx,x,y)
        this.realx= realx 
        this.width = 60
        this.height = 60 
        this.appears = false
        this.attack = MAINATTACK

        this.img = new Image()
        this.img.src = './assets/img/Platformer/Spikes.png'
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }
    }

    isReady(){
        return this.img.ready
    }


    draw(){
        
        if(this.isReady() && this.appears){ 
        this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height)   
        }
    }

    appear(element){
        if(this.x < element.x + 150 + element.width &&
            this.x + this.width > element.x + 150 &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){
                this.appears = true
                
            } 
    }
    /* collision(element){
        if(this.x < element.x + element.width &&
            this.x + this.width > element.x  &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){
                
                if(element.x <= element.previousX){
                    element.x = this.x + this.width + 50 
                }

                if(element.x >= element.previousX){
                    element.x = this.x - element.width - 5
                }

                if(!element.inventary.heart){
                    //element.health -= this.attack
 
                }else{
                    element.inventary.heart = false
                }
                
            }
    } */

    collision(element){
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
                         
                     }else{
                         element.inventary.heart = false
                         
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
                         
                     }else{
                         element.inventary.heart = false
                         
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
                     
                    element.x = this.x - element.width - 50
 
                    if(!element.inventary.heart){
                        element.health -= this.attack
                        
                    }else{
                        element.inventary.heart = false
                        
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
                 }  
         }
        
}