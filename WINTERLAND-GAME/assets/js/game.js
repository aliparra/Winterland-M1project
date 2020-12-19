class Game{

    constructor(canvasId){
        this.canvas = document.getElementById(canvasId)
        this.ctx= this.canvas.getContext('2d')

        this.canvas.width= 1280
        this.canvas.height= 720

        this.drawInterval = undefined
        this.fps= 1000/60

        //Instances
        this.background = new Background(this.ctx)
        this.snowfall = new Snowfall(this.ctx)
        this.mainSprite = new MainSprite(this.ctx,200,650)
        this.platformsArr= [
           /*   new BasicPlatform(this.ctx,0,610,128,128),
            new BasicPlatform(this.ctx,127,610,128,128),
            new BasicPlatform(this.ctx,254,490,128,128),
            new BasicPlatform(this.ctx,381,610,128,128),
            new BasicPlatform(this.ctx,508,480,128,128),  */
        ]
        this.enemy1= new BasicEnemy(this.ctx,0,this.canvas.height-50,300)
        
    }

    //Start method
    start(){
        if(!this.drawInterval){ //If I don't have another setInterval I create one. To avoid errors if there are more than one
            this.drawInterval = setInterval(()=>{
                this.clear()
                this.draw()
                this.move()
                this.checkCollisions()

            }, this.fps)
        }
    }

    //Other methods

    clear(){
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)  
    }

    draw(){
        
        this.background.draw()
        this.snowfall.draw()
        this.mainSprite.draw()
        this.platformsArr.forEach((platform) =>  platform.draw())
        this.enemy1.draw()
    }

    move(){
        if(this.mainSprite.x === this.mainSprite.maxX  ) {
            this.background.move()
            this.platformsArr.forEach((platform) =>  platform.move())
        }
        if(this.mainSprite.x === this.mainSprite.minX){
            this.background.moveReverse()
            this.platformsArr.forEach((platform) =>  platform.move())
        }
        this.snowfall.move()
        this.mainSprite.move()
        this.enemy1.move()
        /* this.platformsArr.forEach((platform) =>  platform.move()) */
    }

    onKeyEvent(event){
        this.mainSprite.onKeyEvent(event)
        this.background.onKeyEvent(event)
        this.platformsArr.forEach((platform) =>  platform.onKeyEvent(event))
    }

    checkCollisions(){
        this.platformsArr.forEach((platform) =>  this.mainSprite.collidesWith(platform))
        this.enemyCollisions()
        
    }

    enemyCollisions(){
        this.mainSprite.collidesWith(this.enemy1)
        if(this.mainSprite.collisions.top ){
            this.enemy1.death()
            
        }else if(this.mainSprite.collisions.left || this.mainSprite.collisions.right || this.mainSprite.collisions.bottom){
            this.mainSprite.health -=10
            if(this.mainSprite.health<=0){
                this.mainSprite.death()
            }
        }
    }
}
