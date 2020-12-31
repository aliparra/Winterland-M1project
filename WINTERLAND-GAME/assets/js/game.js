class Game{

    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx= this.canvas.getContext('2d')

        this.canvas.width= 1200
        this.canvas.height= 640

        this.drawInterval = undefined
        

        //INSTANCES
        
        //Characters
        this.mainSprite = new MainSprite(this.ctx,500,0)
        
        //Enviroment
        
        this.platformsArr = []  
        this.backgroundArr = []
        this.snowfallArr = []

        

        //Enemies
        this.basicEnemyArr = [
            new BasicEnemy(this.ctx,800,200,100), 
            new BasicEnemy(this.ctx,450,200,100), 
            //new BasicEnemy(this.ctx,1200,300,30),
            //new BasicEnemy(this.ctx,1500,300,100)   
        ]
        //Collectable Objects

        this.coinsArr = [
            
            new Coin(this.ctx,500,350),
            new Coin(this.ctx,550,350),
            new Coin(this.ctx,650,100),
            new Coin(this.ctx,720,100),
            new Coin(this.ctx,800,100),
            new Coin(this.ctx,950,350)
        ]

        this.prizesArr = [
            new Heart(this.ctx,1330,250),
            new Heart(this.ctx,370,100),
            new Coin(this.ctx,2530,100)
        ]

        this.mysteryBoxArr = [
            new MisteryBox(this.ctx, 1300, 250),
            new MisteryBox(this.ctx, 350, 100),
            new MisteryBox(this.ctx, 2500, 100)
        ]

        //World tiles
        //this.worldConstructor = new worldConstructor (this.ctx)
        this.airPlatformsArr = [
            new AirPlatform(this.ctx,400,400),
            new AirPlatform(this.ctx,600,250),
            new AirPlatform(this.ctx,800,400),
            new AirPlatform(this.ctx,2120,400),
            new AirPlatform(this.ctx,2450,380),

        ]

        this.warningSignArr = [
            new WarningSign(this.ctx,1450,470)
        ]

        this.spikesArr = [
            new Spike(this.ctx,1650,470)
        ]

        //COUNTERS

        //Coin counter
        this.coinsCounter = 0 
        this.pointsCoin = new Coin(this.ctx, this.mainSprite.x, 20)
        
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
        this.airPlatformsArr.forEach((platform) =>  platform.draw())
        this.coinsArr.forEach((coin) =>  coin.draw())
        this.prizesArr.forEach((heart) =>  heart.draw())
        this.mysteryBoxArr.forEach((box) =>  box.draw())
        this.warningSignArr.forEach((sign) =>  sign.draw())
        this.spikesArr.forEach((spike) =>  spike.draw())
        this.pointsCoin.counterDraw(this.mainSprite, this.coinsCounter)
        this.basicEnemyArr.forEach((enemy) =>  enemy.draw())
       

        //HELPERS
        this.mainSprite.spritePosition()

        

       
        this.ctx.restore();
    }

    move(){
       
        this.snowfallArr.forEach((snowfall) =>  snowfall.move())
        this.mainSprite.move()
        this.basicEnemyArr.forEach((enemy) =>  enemy.move())
        
    }

    animate(){
        this.mainSprite.animate
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
            let auxPlatform = new BasicPlatform(this.ctx,i,545,100,100)
            this.platformsArr.push(auxPlatform)}
            
            //Base platforms deleted
            this.deletePlatforms(4,10,this.platformsArr)
            this.deletePlatforms(20,25,this.platformsArr)
            


         /* this.worldConstructor.addCoin(this.coinsArr) */
         
         

    }
    
    deletePlatforms(init,end,arr){
        for(let i=init; i<= end; i++){
            delete arr[i]
         }
    }

    onKeyEvent(event){
        this.mainSprite.onKeyEvent(event)
    
    }

    checkCollisions(){
        //Sprite-platforms
        this.platformsArr.forEach((platform) =>  this.mainSprite.collidesWith(platform))
        //Sprite-air platforms
        this.airPlatformsArr.forEach((platform) =>  this.mainSprite.collidesWithAp(platform,platform.x))
        this.airPlatformsArr.forEach((platform) =>  this.mainSprite.collidesWithAp(platform,platform.x1))
        this.airPlatformsArr.forEach((platform) =>  this.mainSprite.collidesWithAp(platform,platform.x2))
        //Enemy-platforms
         this.platformsArr.forEach((platform) => {
            this.basicEnemyArr.forEach((enemy) => enemy.collidesWith(platform))}
        ) 
        //Enemy-air platforms
        this.airPlatformsArr.forEach((platform) => {
            this.basicEnemyArr.forEach((enemy) => enemy.collidesWithAp(platform,platform.x))}
        ) 
        this.airPlatformsArr.forEach((platform) => {
            this.basicEnemyArr.forEach((enemy) => enemy.collidesWithAp(platform,platform.x1))}
        ) 
        this.airPlatformsArr.forEach((platform) => {
            this.basicEnemyArr.forEach((enemy) => enemy.collidesWithAp(platform,platform.x2))}
        ) 
        //Enemy- air platforms
        this.airPlatformsArr.forEach((platform) => {
            this.basicEnemyArr.forEach((enemy) => enemy.collidesWith(platform))}
        ) 
        //Sprite-coins
        this.coinsArr.forEach((coin) =>  this.mainSprite.collision(coin))
        //Enemy-sprite
        this.basicEnemyArr.forEach((enemy) =>  enemy.collisionEnemy(this.mainSprite))
        
        //Sprite-Mistery Box

        this.mysteryBoxArr.forEach((box,i) =>  this.mainSprite.boxCollision(box,this.prizesArr[i]))

        //Sprite- heart

        this.prizesArr.forEach((heart) => this.mainSprite.heartCollision(heart))


        //Sprite- spike
        this.spikesArr.forEach((spike) => spike.appear(this.mainSprite))
        this.spikesArr.forEach((spike) => spike.collision(this.mainSprite))

        //Enemy-snowballs

        this.basicEnemyArr.forEach((enemy) => {
            this.mainSprite.snowballs.forEach((snowball) => enemy.collision(snowball))}
        ) 
       
    }

    coinsCount(){

        const restCoins = this.coinsArr.filter( coin => !this.mainSprite.collision(coin))
        const newPoints = this.coinsArr.length - restCoins.length
        this.coinsCounter += newPoints

        this.coinsArr = restCoins

    } 

   

   
}