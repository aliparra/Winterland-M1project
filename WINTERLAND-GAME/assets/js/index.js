window.addEventListener('load', () => {
    
    const game= new Game('game-winterland')

    document.addEventListener('keypress', () => {
        game.start()
    })

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
      })
      
    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
    })


})