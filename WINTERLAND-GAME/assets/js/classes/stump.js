class Stump extends GenericClass{

    constructor(ctx,x,y,w,h,type){
        super(ctx,x,y)

        //Size
        this.width = w
        this.height = h
        this.type = type
        
        //Image
        this.img = new Image()
        if(type === 'stump'){
            this.img.src = './assets/img/Environment/Stump-fixed.png'}
        else if(type === 'barrel'){
            this.img.src = './assets/img/Platformer/Wooden_Barrel.png'    
        }else if(this.type === 'box'){
            this.img.src = './assets/img/Platformer/Wooden_Box.png'  
        }
        this.ready=false;
        this.img.onload = () => {
            this.img.ready = true
        }

       
    }

    isReady(){
        return this.img.ready
    }

    draw(){
        if(this.isReady()){
        this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height)   
        }
    }

}