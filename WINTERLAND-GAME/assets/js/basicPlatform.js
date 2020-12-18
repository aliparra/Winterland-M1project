class BasicPlatform{

    constructor(ctx,x,y,width,height){
        this.ctx=ctx

        this.x= x
        this.y= y
        this.width= width
        this.height=height

    }

    draw(){

       this.ctx.save()
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x,this.y,this.width,this.height)
        this.ctx.restore()
    }

}