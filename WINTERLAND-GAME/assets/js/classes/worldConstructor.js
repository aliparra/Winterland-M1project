class worldConstructor extends GenericClass{

    constructor(ctx,){
        super(ctx)

        //ARRAYS WITH INSTANCES
        //COINS 
        this.coinsArray = [
        new Coin(this.ctx,300,550),
        new Coin(this.ctx,400,550),
        new Coin(this.ctx,500,550),
        new Coin(this.ctx,700,550),
        ]

        
        
    }

    addCoin(arr){
        this.coinsArray.forEach(element => {
            arr.push(element)
        })  
    }

  
}