class Decoration extends Stump{

    constructor(ctx,x,y,w,h,type){
        super(ctx,x,y,w,h)
        this.type = type

        
        //Image
        this.img = new Image()

        switch(this.type) {
            case 'tree':
                this.img.src = './assets/img/Environment/Tree_02.png'
              break;
            case 'nudeTree':
                this.img.src = './assets/img/Environment/Tree_01.png'
              break;
            case 'snowMan':
                this.img.src = './assets/img/Environment/Snowman.png'
              break;
            case 'bush':
                this.img.src = './assets/img/Environment/Bush.png'
            break;
            case 'grass':
                this.img.src = './assets/img/Environment/Grass.png'
                break;
            case 'fence':
                this.img.src = './assets/img/Environment/Fence.png'
                break;
            
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