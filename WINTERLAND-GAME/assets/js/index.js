window.addEventListener('load', () => {
    
    const game= new Game('game-winterland')

    document.addEventListener('keypress', () => {
        game.start()
    })
})