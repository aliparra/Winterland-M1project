class Game{

    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx= this.canvas.getContext('2d')

        this.canvas.width= 1200
        this.canvas.height= 650

        this.drawInterval = undefined
        

        //INSTANCES
        
        //Characters
        this.mainSprite = new MainSprite(this.ctx,0,0)
        

        //Enviroment
        
        this.platformsArr = []  
        this.backgroundArr = []
        this.snowfallArr = []

        //Enemies
        this.basicEnemyArr = [
             new BasicEnemy(this.ctx,300,300,300), 
            new BasicEnemy(this.ctx,600,300,100), 
            new BasicEnemy(this.ctx,900,300,200),
            new BasicEnemy(this.ctx,1200,300,100),
            new BasicEnemy(this.ctx,1500,300,100) 
        ]
        //Collectable Objects

        this.coinsArr = [
            new Coin(this.ctx,300,550),
            new Coin(this.ctx,400,550),
            new Coin(this.ctx,500,550),
            new Coin(this.ctx,700,550),
            new Coin(this.ctx,900,550),
            new Coin(this.ctx,1100,550)
        ]

        //World tiles
        this.worldConstructor = new worldConstructor (this.ctx)
        

        //COUNTERS

        //Coin counter
        this.coinsCounter = 0 
        this.pointsCoin = new Coin(this.ctx, this.mainSprite.maxX, 20)
        
        //Health counter

        
    }

    
    //Start method
    start(){
        if(!this.drawInterval){ 
            this.drawInterval = setInterval(()=>{
                this.clear()
                this.generateObject()
                this.draw()
                this.move()
                this.checkCollisions()
                this.coinsCount()
                

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
        this.snowfallArr.forEach((snowfall) =>  snowfall.draw())
        this.mainSprite.draw()
        this.platformsArr.forEach((platform) =>  platform.draw())
        this.coinsArr.forEach((coin) =>  coin.draw())
        this.pointsCoin.counterDraw(this.mainSprite, this.coinsCounter)
        this.basicEnemyArr.forEach((enemy) =>  enemy.draw())

        

       
        this.ctx.restore();
    }

    move(){
       
        this.snowfallArr.forEach((snowfall) =>  snowfall.move())
        this.mainSprite.move()
        this.basicEnemyArr.forEach((enemy) =>  enemy.move())
        
    }

    generateObject(){

        for(let i=0; this.backgroundArr.length<= NUMBACKGROUND; i+=this.ctx.canvas.width){
            let auxBackground = new Background(this.ctx,i)
            this.backgroundArr.push(auxBackground)
         }

         for(let i=0; this.snowfallArr.length<= NUMBACKGROUND; i+=this.ctx.canvas.width){
            let auxSnowfall = new Snowfall(this.ctx,i)
            this.snowfallArr.push(auxSnowfall)
         }


        for(let i=0; this.platformsArr.length<= NUMFLOOR; i+=100){
            let auxPlatform = new BasicPlatform(this.ctx,i,620,100,100)
            this.platformsArr.push(auxPlatform)
         }

         /* this.worldConstructor.addCoin(this.coinsArr) */
         
         

    }
    
    onKeyEvent(event){
        this.mainSprite.onKeyEvent(event)
    
    }

    checkCollisions(){
        this.platformsArr.forEach((platform) =>  this.mainSprite.collidesWith(platform))
        //this.platformsArr.forEach((platform) =>  this.basicEnemyArr[0].collidesWith(platform))
         this.platformsArr.forEach((platform) => {
            this.basicEnemyArr.forEach((enemy) => enemy.collidesWith(platform))}
        ) 
        //this.coinsArr.forEach((coin) =>  coin.collision(this.mainSprite))
        this.coinsArr.forEach((coin) =>  this.mainSprite.collision(coin))
        this.basicEnemyArr.forEach((enemy) =>  enemy.collisionEnemy(this.mainSprite))
        
        
    }

    coinsCount(){

        const restCoins = this.coinsArr.filter( coin => !this.mainSprite.collision(coin))
        const newPoints = this.coinsArr.length - restCoins.length
        this.coinsCounter += newPoints

        this.coinsArr = restCoins

    } 

   
}
