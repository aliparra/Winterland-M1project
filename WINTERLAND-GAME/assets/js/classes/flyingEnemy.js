
class FlyingEnemy extends BasicEnemy{
    constructor(ctx,x,y,distance){

        super(ctx,x,y)

        //Auxiliar properties to move from one side to another
        this.distance = distance + this.y
        this.init = this.y
        this.status = {
            up: false,
            down: true,
            death: false
        }

        //X and y speed

        this.vx= 0
        this.vy= 2
        //Collisions 
        this.collisions = {
            sprite: false,
            snowball: false
        }

        this.width = 5
        this.height = 5

    }

    isReady(){
        return this.sprite.isReady
    }

    draw(){
        this.ctx.save()
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x,this.y,50,50)
        this.ctx.restore()
    }

    move(){

        //MOVEMENTS

        this.previousX = this.x
        this.previousY = this.y
        
        //Moving from one side to another from initial position to provided distance
        if(this.y === this.distance ){
            this.changeDir = false
            this.status.up = false
            this.status.down = true
        }else if (this.y === this.init ){
            this.changeDir = true
            this.status.up = true
            this.status.down = false
        }
        //CHANGE Y POSITION
        if(this.changeDir){
            this.y += this.vy
        }else if(this.changeDir === false){
            this.y -= this.vy
        }
        
        
    }

    //ENEMY - SNOWBALLS COLLISIONS
    snowBallCollision(element){
        if(this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){

            //console.log('enemy was attacked')
            this.health -= element.attack
            if(this.health<=0){
                console.log('dieeeeeeeee')
                this.death()
            }
            }
        
    }


    spriteCollision(element){
        if(this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y){

            //console.log('enemy was attacked')
            element.health -= this.attack
            element.healthStatus()
            }
        
    }
}