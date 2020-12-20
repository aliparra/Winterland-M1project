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
        this.mainSprite = new MainSprite(this.ctx,200,200)
        this.enemy1= new BasicEnemy(this.ctx,300,570,600)
        this.platformsArr= [
            new BasicPlatform(this.ctx,0,620,128,128),
            new BasicPlatform(this.ctx,127,620,128,128),
            new BasicPlatform(this.ctx,254,620,128,128),
            new BasicPlatform(this.ctx,381,620,128,128),
            new BasicPlatform(this.ctx,508,620,128,128),
            new BasicPlatform(this.ctx,635,620,128,128),
            new BasicPlatform(this.ctx,762,620,128,128)    
        ]
        
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
            if(this.mainSprite.isRunning){
                this.background.quickMove()
                this.platformsArr.forEach((platform) => platform.quickMove())
            }else{
            this.background.move()
            this.platformsArr.forEach((platform) =>  platform.move())
            }   
        }
        if(this.mainSprite.x === this.mainSprite.minX){
            this.background.moveReverse()
            this.platformsArr.forEach((platform) =>  platform.move())
        }
        this.snowfall.move()
        this.mainSprite.move()
        this.enemy1.move()

    }

    onKeyEvent(event){
        this.mainSprite.onKeyEvent(event)
        this.background.onKeyEvent(event)
        this.platformsArr.forEach((platform) =>  platform.onKeyEvent(event))
    }

    checkCollisions(){
        this.platformsArr.forEach((platform) =>  this.mainSprite.collidesWith(platform))
        this.enemy1.enemyCollision(this.mainSprite)
        
    }

   
}
