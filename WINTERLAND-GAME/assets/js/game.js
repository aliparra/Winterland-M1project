class Game{

    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx= this.canvas.getContext('2d')

        this.canvas.width= 1280
        this.canvas.height= 720

        this.drawInterval = undefined
        

        //Instances

        //Backgrounds
        /* this.background = new Background(this.ctx) */
        this.snowfall = new Snowfall(this.ctx)

        //Characters
        this.mainSprite = new MainSprite(this.ctx,0,0)
        this.enemy1= new BasicEnemy(this.ctx,300,570,600)

        //Enviroment
        this.platformsArr = []  
        this.backgroundArr = []
        
    }

    
    //Start method
    start(){
        if(!this.drawInterval){ 
            this.drawInterval = setInterval(()=>{
                this.clear()
                this.draw()
                this.move()
                this.checkCollisions()
                this.generateObject()

            }, FPS)
        }
    }

    //Other methods

    clear(){
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)  
    }

    draw(){
        this.ctx.save();
        if(this.mainSprite.x > this.canvas.width/2){ //At init mainSprite starts on left side
            this.ctx.translate(-this.mainSprite.maxX + this.canvas.width / 2, 0)
            if(this.mainSprite.maxX - this.mainSprite.x >= this.canvas.width / 2){
                this.ctx.translate(this.mainSprite.maxX - this.mainSprite.x, 0)
            }
        }
        this.backgroundArr.forEach((background) =>  background.draw())
        this.snowfall.draw()
        this.mainSprite.draw()
        this.platformsArr.forEach((platform) =>  platform.draw())
        this.enemy1.draw()
        this.ctx.restore();
    }

    move(){
       
        
        this.snowfall.move()
        this.mainSprite.move()
        this.enemy1.move()
        

    }

    generateObject(){

        for(let i=0; this.backgroundArr.length<= NUMBACKGROUND; i+=this.ctx.canvas.width){
            let auxBackground = new Background(this.ctx,i)
            this.backgroundArr.push(auxBackground)
         }


        for(let i=0; this.platformsArr.length<= NUMFLOOR; i+=100){
            let auxPlatform = new BasicPlatform(this.ctx,i,620,100,100)
            this.platformsArr.push(auxPlatform)
         }


    }

    onKeyEvent(event){
        this.mainSprite.onKeyEvent(event)
        this.platformsArr.forEach((platform) =>  platform.onKeyEvent(event))
    }

    checkCollisions(){
        this.platformsArr.forEach((platform) =>  this.mainSprite.collidesWith(platform))
        this.enemy1.enemyCollision(this.mainSprite)
        
    }

   
}
