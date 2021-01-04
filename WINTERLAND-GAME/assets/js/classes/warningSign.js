class WarningSign extends GenericClass{

    constructor(ctx,x,y,type){
        super(ctx,x,y)

        this.width = 70
        this.height = 70 
        this.type = type

        this.img = new Image()
        switch(this.type) {
            case 1:
                this.img.src = './assets/img/Environment/Sign_01.png'
              break;
            case 2:
                this.img.src = './assets/img/Environment/Sign_02.png'
              break;
            case 3:
                this.img.src = './assets/img/Environment/Sign_03.png'
              break;
            case 4:
                this.img.src = './assets/img/Environment/Sign_04.png'
            break;
            case 5:
                this.img.src = './assets/img/Environment/Sign_05.png'
                break;
            case 6:
                this.img.src = './assets/img/Environment/Sign_06.png'
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