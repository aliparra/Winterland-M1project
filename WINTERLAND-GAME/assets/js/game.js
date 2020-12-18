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
        this.mainSprite = new MainSprite(this.ctx,10,650)
        this.platformsArr= [
            new BasicPlatform(this.ctx,800,670,200,30),
            
            
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
    }

    move(){
        this.background.move()
        this.snowfall.move()
        this.mainSprite.move()
    }

    onKeyEvent(event){
        this.mainSprite.onKeyEvent(event)
        this.background.onKeyEvent(event)
    }

    checkCollisions(){
        this.platformsArr.forEach((platform) =>  this.mainSprite.collideswith(platform))
        }
        
}
