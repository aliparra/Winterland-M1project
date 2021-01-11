# WINTERLAND PLATFORMS GAME (MODULE 1 IRONHACK PROJECT)

<img src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/init/winterland.png?raw=true'>

### INTRODUCTION 

##### (Este juego ha sido desarrollado como el primer proyecto después de terminar el primer módulo del bootcamp Full Stack web development de Ironhack.) </br></br>
Winterland es un juego de plataformas inspirado en el mundo de invierno, donde el hielo y la nieve están todo el rato presentes. 
A través de los controles por teclado, el jugador deberá de superar obstáculos , evitar y eliminar enemigos, saltar de una plataforma 
a otra evitando caer al vacío y obtener la máxima cantidad de monedas posible. 
La puntuación final se obtendrá basándose en el número de monedas conseguidas al llegar al final de la partida, se podrá lograr una, dos o tres estrellas. 

### CÓMO JUGAR

- Para comenzar pulsar el botón start ubicado en el centro de la pantalla. 
- Para pausar el juego, pulsar el boton pause ubicado en el lado izquierdo de la pantalla.
- Para recargar la página, pulsar en el botón reload que aparecerá a la izquierda de la pantalla una vez haya comenzado el juego
- Para silenciar la música pulsar en el botón <img align="center" alt="Stop Music Button" width="50px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/Buttons/Music_BTN.png?raw=true'>
- Para retomar la música pulsar el botón <img align="center" alt="Restart Music Button" width="50px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/Buttons/Music_BTN_Off.png?raw=true'>
- Para silenciar  pulsar el botón <img align="center" alt="Stop Sounds Button" width="50px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/Buttons/Sound_BTN.png?raw=true'>
- Para retomar los sonidos del personaje y las colisiones con enemigos pulsar el botón <img align="center" alt="Restart Sounds Button" width="50px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/Buttons/Sounds_BTN_Off.png?raw=true'>

### CONTROLES DE MOVIMIENTO DEL PERSONAJE

- Para caminar pulsar las flechas derecha e izquierda
- Para saltar pulsar la flecha hacia arriba
- Para correr a la derecha, pulsar la flecha derecha y la letra D simultáneamente
- Para correr a la derecha, pulsar la flecha izquierda y la letra D simultáneamente
- Para saltar mayor distancia pulsar la flecha izquierda/derecha , la flecha hacia arriba y la D simultáneamente
- Para disparar (Solo si has obtenido un objeto tipo bola de nieve) pulsar la barra espaciadora
<img align="center" alt="Keyboard game controls" width="200px" src= 'https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/init/Screenshot%20at%20Jan%2011%2011-50-35.png?raw=true'>

###OBJETOS ESPECIALES Y ENEMIGOS

**OBJETOS** </br>
(Es necesario colisionar con los objetos para obtenerlos)
- <img align="left" alt="Bola de nieve" width="20px" src= 'https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/CollectableObject/Bubble.png?raw=true'>**La bola de nieve**: Permite lanzar bolas de nieve durante 20 segundos para eliminar a los enemigos tanto voladores como terrestres.
- <img align="left" alt="Corazón" width="20px" src= 'https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/CollectableObject/Life.png?raw=true'> **El corazón**: Aumenta el tamaño del personaje y le otorga una vida extra
- <img align="left" alt="Manzana" width="20px" src= 'https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/CollectableObject/Apple.png?raw=true'> **La manzana**: Disminuye el tamaño del personaje para que éste pueda acceder a lugares con dimensiones reducidas. 
- <img align="left" alt="Moneda" width="20px" src= 'https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/CollectableObject/Coin_01.png?raw=true'> **La moneda**: Aumenta el contador de puntos que se tendrá en cuenta para la puntuación al final del juego. 

**ENEMIGOS** </br>
Hay dos tipos de enemigos, voladores y terrestres.</br>
<img align="left" alt="Enemigo volador" width="30px" src= 'https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/enemySprite/Screenshot2%20at%20Jan%2011%2012-12-19.png?raw=true'> - **Enemigos voladores** (Cara morada): Se puede optar por esquivarlos. Solo se podrán eliminar lanzándoles una bola de nieve. 
<img align="left" alt="Enemigo terrestre" width="30px" src= 'https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/enemySprite/Screenshot%20at%20Jan%2011%2012-11-53.png?raw=true'> </br> - **Enemigos terrestres** (Cara azul): Se pueden eliminar saltando encima de ellos o lanzándoles una bola de nieve.


**TRAMPAS Y PLATAFORMAS MÓVILES**
- <img align="left" alt="Trampa pinchos" width="40px" src= 'https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/Platformer/Spikes.png?raw=true'> **Trampa de pinchos de hielo:** Aparecerá cuando el personaje esté a pocos metros de ella. Emitirá un sonido característico. Es necesario esquivarla saltando.
- <img align="left" alt="Plataformas móviles " width="40px" src= 'https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/Environment/Icicle_02.png?raw=true'> **Plataformas móviles:** Se mueven de un lado a otro recorriendo una distancia determinada.
- <img align="left" alt="Plataforma resbaladiza" width="40px" src= 'https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/Platformer/Screenshot%20at%20Jan%2011%2012-15-03.png?raw=true'> **Plataformas de hielo resbaladizo:** El personaje se deslizará hacia la derecha o hacia la izquierda, siendo necesario caminar o correr para evitar caer al vacío.

### FIN DEL JUEGO

- <img align="left" alt="Nivel no conseguido" width="100px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/Buttons/HeaderFailed.png?raw=true'> **NIVEL NO CONSEGUIDO**: Si se termina la vida del personaje, aparecerá una pantalla que mostrará el cartel de nivel no completado. Es necesario hacer un reload del juego para intentarlo de nuevo

- <img align="left" alt="Nivel completado" width="100px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/Buttons/Header.png?raw=true'> **NIVEL COMPLETADO**: Si se llega a la parte final del juego se podrá obtener un objeto luminoso, que finalizará el nivel mostrando la puntuación obtenida y el número de estrellas logrado:</br>

**PUNTUACIÓN FINAL**:</br></br>
<img align="left" alt="Estrella" width="40px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/CollectableObject/Star_01.png?raw=true'> 1-10 Monedas </br></br></br>
<img align="left" alt="Estrella" width="40px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/CollectableObject/Star_01.png?raw=true'>  <img align="left" alt="Estrella" width="40px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/CollectableObject/Star_01.png?raw=true'> 11-20 Monedas </br></br></br>
<img align="left" alt="Estrella" width="40px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/CollectableObject/Star_01.png?raw=true'>  <img align="left" alt="Estrella" width="40px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/CollectableObject/Star_01.png?raw=true'>  <img align="left" alt="Estrella" width="40px" src='https://github.com/aliparra/Winterland-M1project/blob/master/WINTERLAND-GAME/assets/img/CollectableObject/Star_01.png?raw=true'> +20 Monedas
