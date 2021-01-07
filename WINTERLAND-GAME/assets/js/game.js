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
        this.mainSprite = new MainSprite(this.ctx,12800,30)
        
        //Enviroment
        
        this.separatePlatformsArr = [
            
            new BasicPlatform(this.ctx,2100,300,150,50,'ice'),
            new BasicPlatform(this.ctx,2200,150,150,50,'ice'),
            new BasicPlatform(this.ctx,3640,300,50,50,'ice'),
            new BasicPlatform(this.ctx,3800,200,355,75,'ice'), 
            new BasicPlatform(this.ctx,6570,350,110,50,'ice'),
            new BasicPlatform(this.ctx,6900,260,1040,50,'ice'),
            new BasicPlatform(this.ctx,7915,250,40,40,'bridge'),
            new BasicPlatform(this.ctx,7935,280,40,40,'bridge'),
            new BasicPlatform(this.ctx,7965,300,40,40,'bridge'),
            new BasicPlatform(this.ctx,8000,310,40,40,'bridge'),
            new BasicPlatform(this.ctx,8035,310,40,40,'bridge'),
            new BasicPlatform(this.ctx,8070,300,40,40,'bridge'),
            new BasicPlatform(this.ctx,8100,290,40,40,'bridge'),
            new BasicPlatform(this.ctx,8135,300,300,50,'ice'),
            new BasicPlatform(this.ctx,9750,330,80,50,'ice'),
            new BasicPlatform(this.ctx,9950,280,80,50,'ice'),
            new BasicPlatform(this.ctx,10200,240,100,50,'ice'),
            new BasicPlatform(this.ctx,11050,240,100,50,'ice'),
            new BasicPlatform(this.ctx,11800,560,1000,30,'ice'),
            new BasicPlatform(this.ctx,12780,460,400,20,'ice'),
            new BasicPlatform(this.ctx,13170,660,400,30,'ice'),
            new BasicPlatform(this.ctx,13580,460,120,100,'basic'),
            new BasicPlatform(this.ctx,13700,460,100,100,'basic'),
            new BasicPlatform(this.ctx,13800,460,100,100,'basic'),
            new BasicPlatform(this.ctx,13900,460,100,100,'basic'),
            new BasicPlatform(this.ctx,14000,460,100,100,'basic'),

            

            
        ]  

        this.platformsArr = []
        this.backgroundArr = []
        this.snowfallArr = []
    
        
       
        //Collectable Objects

        this.finalLight = new Light(this.ctx, 14999,470)
        this.coinsArr = [
            
            
            new Coin(this.ctx,620,100),
            new Coin(this.ctx,670,100),
            new Coin(this.ctx,720,100),
            new Coin(this.ctx,4575,170),
            new Coin(this.ctx,4575,220),
            new Coin(this.ctx,4575,270),
            new Coin(this.ctx,5785,170),
            new Coin(this.ctx,5785,220),
            new Coin(this.ctx,5785,270),
            new Coin(this.ctx,7600,220),
            new Coin(this.ctx,7670,220),
            new Coin(this.ctx,7740,220),
            new Coin(this.ctx,7000,350),
            new Coin(this.ctx,7100,350),
            new Coin(this.ctx,7200,350),
            new Coin(this.ctx,7300,350),
            new Coin(this.ctx,7400,350),
            new Coin(this.ctx,7500,350),
            new Coin(this.ctx,7600,350),
            new Coin(this.ctx,7700,350),
            new Coin(this.ctx,13200,200),
            new Coin(this.ctx,13300,200),
            new Coin(this.ctx,13400,200),
            new Coin(this.ctx,13500,200),
            new Coin(this.ctx,13600,200),
            new Coin(this.ctx,14400,350),
           new Coin(this.ctx,14500,350),
            new Coin(this.ctx,14600,350),
            new Coin(this.ctx,14700,350),
            new Coin(this.ctx,14800,350)
        ]

        this.bubbleArr = [
            new Bubble(this.ctx,380,100),
            new Bubble(this.ctx,4030,123),
            new Heart(this.ctx, 7380, 70),
            new Bubble(this.ctx,8325,220),
            new Bubble(this.ctx,11125,170)
        ]

        this.prizesArr = [
            
            new Apple(this.ctx, 1230, 250),
            new Heart(this.ctx, 3130, 200), 
            new Heart(this.ctx, 10930, 175),
            new Apple(this.ctx, 9830, 470)
        ]

        this.mysteryBoxArr = [
            new MisteryBox(this.ctx, 1200, 250),
            new MisteryBox(this.ctx, 3100, 200),
            new MisteryBox(this.ctx, 10900, 170)
            
            
        ]

        this.brickPrizesArr = [
            new Coin(this.ctx,140,270),
            new Coin(this.ctx,2530,220),
            new Coin(this.ctx,2630,270),
            new Coin(this.ctx,2730,370),
            new Coin(this.ctx,8990,240),
            new Coin(this.ctx,9090,240),
            new Coin(this.ctx,9160,240),
            new Coin(this.ctx,9290,240),
            new Coin(this.ctx,9390,240),
            new Coin(this.ctx,10530,175),
            new Coin(this.ctx,10630,175),
            new Coin(this.ctx,10730,175)
            
            


            
        ]

        this.bricksArr = [
         new Brick(this.ctx, 100, 250),
         new Brick(this.ctx, 2500, 150),
         new Brick(this.ctx, 2600, 250),
         new Brick(this.ctx, 2700, 350),
         new Brick(this.ctx, 8960, 230),
         new Brick(this.ctx, 9060, 230),
         new Brick(this.ctx, 9160, 230),
         new Brick(this.ctx, 9260, 230),
         new Brick(this.ctx, 9360, 230),
         new Brick(this.ctx, 10500, 170),
         new Brick(this.ctx, 10600, 170),
         new Brick(this.ctx, 10700, 170)

            
        ]

        //Enemies
        this.basicEnemyArr = [
             new BasicEnemy(this.ctx,800,200,100), 
            new BasicEnemy(this.ctx,600,100,30),
            new BasicEnemy(this.ctx,1500,300,100),
            new BasicEnemy(this.ctx,3010,300,100),
            new BasicEnemy(this.ctx,6930,100,50), 
            new BasicEnemy(this.ctx,7550,50,50), 
            new BasicEnemy(this.ctx,12000,50,100),
            new BasicEnemy(this.ctx,12200,50,100),
            new BasicEnemy(this.ctx,12400,50,100)

        ]

        this.flyingEnemyArr = [
            new FlyingEnemy(this.ctx,530,100,400,0), 
            new FlyingEnemy(this.ctx,4550,100,400,0),
            new FlyingEnemy(this.ctx,4900,100,400,3000),
            new FlyingEnemy(this.ctx,5350,100,400,0),
            new FlyingEnemy(this.ctx,5750,100,400,3000),
            new FlyingEnemy(this.ctx,6200,100,400,0),
            new FlyingEnemy(this.ctx,8167,100,400,0),
            new FlyingEnemy(this.ctx,9040,100,400,0),
            new FlyingEnemy(this.ctx,9260,100,400,3000),
            new FlyingEnemy(this.ctx,14140,100,400,0)
            
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
            
            new MovePlatform(this.ctx,1750,200,150,50,1400,1750,2),
            new MovePlatform(this.ctx,1900,450,150,50,1900,2400,2),
            new MovePlatform(this.ctx,3450,430,50,50,3450,3600,2),
            new MovePlatform(this.ctx,6700,400,100,50,6700,7900,2),
            new MovePlatform(this.ctx,10400,500,100,50,10400,10750,2),
            new MovePlatform(this.ctx,10850,550,300,50,10850,10000,1), // Special movement
            new MovePlatform(this.ctx,11150,480,100,50,11150,11300,1),
            new MovePlatform(this.ctx,11400,380,100,50,11400,11600,2),
            new MovePlatform(this.ctx,11800,550,1000,50,11800,11000,2),// Special movement
            new MovePlatform(this.ctx,12780,450,400,50,12800,12000,2),
            new MovePlatform(this.ctx,13170,350,420,50,13180,13000,2)// Special movement
            
            
        ]

        this.stumpArr = [
           new Stump(this.ctx,2900,470,100,80,'stump'),
           new Stump(this.ctx,4550,470,100,80,'stump'),
           new Stump(this.ctx,5750,470,100,80,'stump'),
           new Stump(this.ctx,6480,470,100,80,'stump'),
           new Stump(this.ctx,7350,180,100,80,'box'),
           new Stump(this.ctx,9570,470,100,80,'stump'),
           


        ]

        this.warningSignArr = [
            new WarningSign(this.ctx,1450,480,5),
            new WarningSign(this.ctx,2600,480,3),
            new WarningSign(this.ctx,3630,480,4),
            new WarningSign(this.ctx,3860,140,6),
            new WarningSign(this.ctx,8505,480,5),
            new WarningSign(this.ctx,8365,240,2),
            new WarningSign(this.ctx,10860,490,6),
            new WarningSign(this.ctx,11850,490,6),
            new WarningSign(this.ctx,12800,385,6)
        ]

        this.spikesArr = [
            new Spike(this.ctx,1650,490),
            new Spike(this.ctx,4140,490),
            new Spike(this.ctx,8700,490),
            new Spike(this.ctx,13100,390)
        ]

        //DECORATION

        this.decorationArr = [
            new Decoration(this.ctx,3200,150,400,400,'tree'),
            new Decoration(this.ctx,3300,200,350,350,'tree'),
            new Decoration(this.ctx,3800,200,350,350,'ground3'),
            new Decoration(this.ctx,4200,150,400,400,'nudeTree'),
            new Decoration(this.ctx,4600,200,350,350,'nudeTree'),
            new Decoration(this.ctx,5000,150,400,400,'nudeTree'),
            new Decoration(this.ctx,5400,200,350,350,'nudeTree'),
            new Decoration(this.ctx,5800,150,400,400,'nudeTree'),
            new Decoration(this.ctx,3950,105,100,100,'snowMan'),
            new Decoration(this.ctx,6100,150,400,400,'tree'),
            new Decoration(this.ctx,6900,250,200,500,'ground5'),
            new Decoration(this.ctx,7100,250,600,500,'ground7'),
            new Decoration(this.ctx,7700,250,200,500,'ground6'),
            new Decoration(this.ctx,7150,170,100,100,'grass'),
            new Decoration(this.ctx,7570,170,100,100,'bush'),
            new Decoration(this.ctx,7670,170,100,100,'bush'),
            new Decoration(this.ctx,7770,170,100,100,'bush'),
            new Decoration(this.ctx,8135,300,300,250,'ground1'),
            new Decoration(this.ctx,8250,200,100,100,'snowMan'),
            new Decoration(this.ctx,7950,450,100,100,'grass'),
            new Decoration(this.ctx,9615,150,400,400,'tree'),
            new Decoration(this.ctx,10850,550,100,100,'ground7'),
            new Decoration(this.ctx,10950,550,100,100,'ground7'),
            new Decoration(this.ctx,11050,550,100,100,'ground7'),
            new Decoration(this.ctx,11050,145,100,100,'snowMan'),
            new Decoration(this.ctx,11800,550,100,100,'ground7'),
            new Decoration(this.ctx,11900,550,100,100,'ground7'),
            new Decoration(this.ctx,12000,550,100,100,'ground7'),
            new Decoration(this.ctx,12100,550,100,100,'ground7'),
            new Decoration(this.ctx,12200,550,100,100,'ground7'),
            new Decoration(this.ctx,12300,550,100,100,'ground7'),
            new Decoration(this.ctx,12400,550,100,100,'ground7'),
            new Decoration(this.ctx,12500,550,100,100,'ground7'),
            new Decoration(this.ctx,12600,550,180,100,'ground7'),
            new Decoration(this.ctx,12780,450,400,200,'ground7'),
            new Decoration(this.ctx,13180,350,400,400,'ground7'),
            new Decoration(this.ctx,13580,550,520,100,'ground06'),
            new Decoration(this.ctx,13630,370,100,100,'grass'),
            new Decoration(this.ctx,13800,170,300,300,'tree'),
            new Decoration(this.ctx,14400,460,100,100,'fence'),
            new Decoration(this.ctx,14500,460,100,100,'fence'),
            new Decoration(this.ctx,14600,460,100,100,'fence'),
            new Decoration(this.ctx,14700,460,100,100,'fence'),
            new Decoration(this.ctx,14080,200,350,350,'tree'),
            new Decoration(this.ctx,14900,460,100,100,'bush'),
            new Decoration(this.ctx,15000,47,600,600,'house'),
            new Decoration(this.ctx,15100,430,120,130,'grandma')            
            

            

        ]
        //COUNTERS

        //Coin counter
        this.coinsCounter = 0 
        this.pointsCoin = new Coin(this.ctx, this.mainSprite.x, 20)
        
        

        
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
                if(this.mainSprite.stopSound){
                    this.sounds.music.volume = 0
                }
                this.winScreen(this.mainSprite)
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
        this.decorationArr.forEach((decoration) =>  decoration.draw())
        this.snowfallArr.forEach((snowfall) =>  snowfall.draw())
        this.warningSignArr.forEach((sign) =>  sign.draw())
        this.mainSprite.draw()
        this.platformsArr.forEach((platform) =>  platform.draw())
        this.separatePlatformsArr.forEach((platform) =>  platform.draw())
        this.movePlatformArr.forEach((platform) =>  platform.draw())
        this.airPlatformsArr.forEach((platform) =>  platform.draw())
        this.stumpArr.forEach((stump) =>  stump.draw())
        this.coinsArr.forEach((coin) =>  coin.draw())
        this.bubbleArr.forEach((bubble) =>  bubble.draw())
        this.finalLight.draw()
        this.prizesArr.forEach((heart) =>  heart.draw())
        this.mysteryBoxArr.forEach((box) =>  box.draw())
        this.brickPrizesArr.forEach((prize) => prize.draw())
        this.bricksArr.forEach((brick) =>  brick.draw())
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
        if(this.mainSprite.healthStatus()){
            this.sounds.music.volume = 0
        }
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
            let auxPlatform = new BasicPlatform(this.ctx,i,545,100,100,'basic')
            this.platformsArr.push(auxPlatform)}
            
            //Base platforms deleted
            this.deletePlatforms(4,10,this.platformsArr)
            this.deletePlatforms(20,25,this.platformsArr)
            this.deletePlatforms(67,78,this.platformsArr),
            this.deletePlatforms(100,140,this.platformsArr)
            


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
        this.separatePlatformsArr.forEach((platform) =>  this.mainSprite.collidesWith(platform))
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
        this.separatePlatformsArr.forEach((platform) => {
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

        //Sprite-bubbles
        this.bubbleArr.forEach((bubble) =>  this.mainSprite.generalCollision(bubble))
        
        //Sprite - Brick coins
        this.brickPrizesArr.forEach((prize) => this.mainSprite.generalCollision(prize))

        //Sprite-finalLight
        this.mainSprite.generalCollision(this.finalLight)
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

    winScreen(sprite){
        if(sprite.win){
    
            this.ctx.fillStyle = 'rgba(120, 120, 120, 0.8)',
            this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),
            this.ctx.fillStyle = "rgb(0,0,0)",
            this.ctx.font = '100px Arial bold',
            this.ctx.fillText('You win',this.ctx.canvas.width/2 - 200,this.ctx.canvas.height/2 ,500)
            this.ctx.font = '30px Arial bold',
            this.ctx.fillText(`Your score is ${this.coinsCounter}`,this.ctx.canvas.width/2 - 200,this.ctx.canvas.height/1.5 ,500)
            this.img = new Image()
            this.img.src = './assets/img/CollectableObject/Star.png'
            this.ready=false;
            this.img.onload = () => {
                this.img.ready = true
            }
            
            if(this.coinsCounter <= 10){
                if(this.img.ready){
                    console.log('draw')
                    this.ctx.drawImage(this.img,100 ,100,300,300)   
                    }
            }else if(this.coinsCounter > 10 && this.coinsCounter <= 20){
                if(this.img.ready){
                    this.ctx.drawImage(this.img,100 ,100,300,300),
                    this.ctx.drawImage(this.img,500 ,100,300,300)      
                    }
            }else {
                if(this.img.ready){
                    this.ctx.drawImage(this.img,100 ,100,300,300),
                    this.ctx.drawImage(this.img,500 ,100,300,300),
                    this.ctx.drawImage(this.img,900 ,100,300,300)     
                    } 
            }
        }
    }

   

   
}

   
