window.addEventListener('load', () => {
    
    const startBtn= document.getElementById('start-game-btn')
    const pauseBtn =  document.getElementById('pause-game-btn')
    const music = document.getElementById('volume-btn')
    const sounds = document.getElementById('sounds-btn')
   

    const game= new Game('game-winterland')
    
    startBtn.addEventListener('click', () => {
        if(startBtn.classList.contains('start')){
        game.start()
        startBtn.classList.remove('start')
        startBtn.classList.add('reload')
        startBtn.innerHTML = 'Reload'
        }
        else if(startBtn.classList.contains('reload'))
        {
            game.reload()
            pauseBtn.classList.remove('reload')
            pauseBtn.classList.add('start')
            pauseBtn.innerHTML = 'Start'
        }
    })

   pauseBtn.addEventListener('click', (event) => {
       if(pauseBtn.classList.contains('pause')){
        game.stop()
        pauseBtn.classList.remove('pause')
        pauseBtn.classList.add('resume')
        pauseBtn.innerHTML = 'Resume'}
        else if(pauseBtn.classList.contains('resume')){
            game.start()
            pauseBtn.classList.remove('resume')
            pauseBtn.classList.add('pause')
            pauseBtn.innerHTML = 'Pause'
        }    
      })

    
    music.addEventListener('click', (event) => {
        if(music.classList.contains('musicON')){
            game.stopMusic()
            music.classList.remove('musicON')
            music.classList.add('musicOFF')
            //pauseBtn.innerHTML = 'Resume'
        }
            else if(music.classList.contains('musicOFF')){
                game.startMusic()
                music.classList.remove('musicOFF')
                music.classList.add('musicON')
                //pauseBtn.innerHTML = 'Pause'
            }    
        })
    
    sounds.addEventListener('click', (event) => {
        if(sounds.classList.contains('soundsON')){
            game.stopSounds()
            sounds.classList.remove('soundsON')
            sounds.classList.add('soundsOFF')
            //pauseBtn.innerHTML = 'Resume'
        }
            else if(sounds.classList.contains('soundsOFF')){
                game.startSounds()
                sounds.classList.remove('soundsOFF')
                sounds.classList.add('soundsON')
                //pauseBtn.innerHTML = 'Pause'
            }    
        })
    
    
    sounds.addEventListener('click', (event) => {
        game.stopSounds()
    
    })

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
        
      })

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
    })


})