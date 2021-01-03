class Game{

    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx= this.canvas.getContext('2d')

        this.canvas.width= 1200
        this.canvas.height= 640

        this.drawInterval = undefined
        

        //SOUND
        this.sounds = {
        music: new Audio('./assets/sounds/mainMusic.mp3')
        }
        this.sounds.music.volume = 0.1
        //INSTANCES
        
        //Characters
        this.mainSprite = new MainSprite(this.ctx,3000,300)
        
        //Enviroment
        
        this.platformsArr = [
            
        ]  
        this.backgroundArr = []
        this.snowfallArr = []
        
       
        //Collectable Objects

        this.coinsArr = [
            
            
            new Coin(this.ctx,620,100),
            new Coin(this.ctx,670,100),
            new Coin(this.ctx,720,100)
            
        ]

        this.prizesArr = [
            new Heart(this.ctx, 1330, 250), 
            new Apple(this.ctx, 1130, 250)
        ]

        this.mysteryBoxArr = [
            new MisteryBox(this.ctx, 1300, 250),
            new MisteryBox(this.ctx, 1100, 250)
            
            
        ]

        this.brickPrizesArr = [
            new Coin(this.ctx,140,270),
            new Coin(this.ctx,2530,220),
            new Coin(this.ctx,2630,270),
            new Coin(this.ctx,2730,370)
        ]

        this.bricksArr = [
         new Brick(this.ctx, 100, 250),
         new Brick(this.ctx, 2500, 150),
         new Brick(this.ctx, 2600, 250),
         new Brick(this.ctx, 2700, 350),
            
        ]

        //Enemies
        this.basicEnemyArr = [
            new BasicEnemy(this.ctx,800,200,100), 
            new BasicEnemy(this.ctx,600,100,30),
            new BasicEnemy(this.ctx,1500,300,100)   
        ]

        this.flyingEnemyArr = [
            new FlyingEnemy(this.ctx,530,100,400), 
            
        ]
        //World tiles
        //this.worldConstructor = new worldConstructor (this.ctx)
        this.airPlatformsArr = [
            new AirPlatform(this.ctx,350,150,30,30),
            new AirPlatform(this.ctx,400,400,50,50),
            new AirPlatform(this.ctx,600,250,50,50),
            new AirPlatform(this.ctx,800,400,50,50),

        ]

        this.movePlatformArr = [
            
            new MovePlatform(this.ctx,1750,200,1400,1750,2),
            new MovePlatform(this.ctx,1900,450,1900,2400,2),
            new MovePlatform(this.ctx,2200,150,2100,2200,0),
            new MovePlatform(this.ctx,2100,300,1900,1900,0)
        ]

        this.stumpArr = [
           new Stump(this.ctx,2900,470,100,80) 
        ]

        this.warningSignArr = [
            new WarningSign(this.ctx,1450,470)
        ]

        this.spikesArr = [
            new Spike(this.ctx,1650,490)
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
                this.checkHealth()
                this.sounds.music.play()
                

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
        this.movePlatformArr.forEach((platform) =>  platform.draw())
        this.airPlatformsArr.forEach((platform) =>  platform.draw())
        this.stumpArr.forEach((stump) =>  stump.draw())
        this.coinsArr.forEach((coin) =>  coin.draw())
        this.prizesArr.forEach((heart) =>  heart.draw())
        this.mysteryBoxArr.forEach((box) =>  box.draw())
        this.brickPrizesArr.forEach((prize) => prize.draw())
        this.bricksArr.forEach((brick) =>  brick.draw())
        this.warningSignArr.forEach((sign) =>  sign.draw())
        this.spikesArr.forEach((spike) =>  spike.draw())
        this.pointsCoin.counterDraw(this.mainSprite, this.coinsCounter)
        this.basicEnemyArr.forEach((enemy) =>  enemy.draw())
        this.flyingEnemyArr.forEach((enemy) =>  enemy.draw())
       

        //HELPERS
        this.mainSprite.spritePosition()

        

       
        this.ctx.restore();
    }

    move(){
       
        this.snowfallArr.forEach((snowfall) =>  snowfall.move())
        this.mainSprite.move()
        this.basicEnemyArr.forEach((enemy) =>  enemy.move())
        this.flyingEnemyArr.forEach((enemy) =>  enemy.move())
        this.movePlatformArr.forEach((platform) =>  platform.move())
        
    }

    animate(){
        this.mainSprite.animate
    }

    checkHealth(){
        this.mainSprite.healthStatus()
        this.basicEnemyArr.forEach((enemy) => {enemy.healthStatus()})
        this.flyingEnemyArr.forEach((enemy) => {enemy.healthStatus()})
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
        //Sprite-stump
        this.stumpArr.forEach((stump) =>  this.mainSprite.collidesWith(stump))
        //Sprite- Move platforms
        this.movePlatformArr.forEach((platform) =>  this.mainSprite.collidesWith(platform))
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
        this.coinsArr.forEach((coin) =>  this.mainSprite.generalCollision(coin))

        this.brickPrizesArr.forEach((prize) => this.mainSprite.generalCollision(prize))
        //Enemy-sprite
        this.basicEnemyArr.forEach((enemy) =>  enemy.collisionEnemy(this.mainSprite))

        //Fying enemy- sprite
        this.flyingEnemyArr.forEach((enemy) =>  enemy.collisionEnemy(this.mainSprite))
        
        //Sprite-Mistery Box

        this.mysteryBoxArr.forEach((box,i) =>  this.mainSprite.boxCollision(box,this.prizesArr[i]))

        //Sprite - Brick

        this.bricksArr.forEach((brick,i) =>  this.mainSprite.boxCollision(brick,this.brickPrizesArr[i]))
        //Sprite- heart

        this.prizesArr.forEach((prize) => this.mainSprite.generalCollision(prize))


        //Sprite- spike
        this.spikesArr.forEach((spike) => spike.appear(this.mainSprite))
        this.spikesArr.forEach((spike) => spike.collision(this.mainSprite))

        // Enemy-snowballs

        this.basicEnemyArr.forEach((enemy) => {
            this.mainSprite.snowballs.forEach((snowball) => enemy.snowBallCollision(snowball))}
        ) 

        this.flyingEnemyArr.forEach((enemy) => {
            this.mainSprite.snowballs.forEach((snowball) => enemy.snowBallCollision(snowball))}
        )
       
    }

    coinsCount(){

        //FREE COINS
        const restCoins = this.coinsArr.filter( coin => !this.mainSprite.generalCollision(coin))
        const newPoints = this.coinsArr.length  - restCoins.length
        

        //COINS INSIDE A BRICK
        const restCoinsBricks = this.brickPrizesArr.filter( coin => !this.mainSprite.generalCollision(coin))
        const newPointsBricks = this.brickPrizesArr.length  - restCoinsBricks.length

        //TOTAL COINS
        this.coinsCounter += newPoints
        this.coinsCounter += newPointsBricks

        //UPDATE COINS ARRAYS
        this.coinsArr = restCoins
        this.brickPrizesArr = restCoinsBricks

    } 

   

   
}

   
