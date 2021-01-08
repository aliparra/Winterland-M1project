window.addEventListener('load', () => {
    
    const startBtn= document.getElementById('start-game-btn')

    const game= new Game('game-winterland')

    document.getElementById('start-game-btn').addEventListener('click', () => {
        game.start()
    })

    document.getElementById('pause-game-btn').addEventListener('click', (event) => {
        game.stop()
        
      })

    document.getElementById('volume-btn').addEventListener('click', (event) => {
        game.stopMusic()
    
    })
    document.getElementById('sounds-btn').addEventListener('click', (event) => {
        game.stopSounds()
    
    })

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
        
      })

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
    })


})