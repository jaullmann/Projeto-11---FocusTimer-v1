const coffeshopSound = new Audio('./assets/coffeShop.wav')
const fireplaceSound = new Audio('./assets/fireplace.wav')
const forestSound = new Audio('./assets/forest.wav')
const rainSound = new Audio('./assets/rain.wav')

coffeshopSound.loop = true
fireplaceSound.loop = true
forestSound.loop = true
rainSound.loop = true

coffeshopSound.volume = 0.3
fireplaceSound.volume = 0.3
forestSound.volume = 0.3
rainSound.volume = 0.3

export const files = {
    coffeshopSound: coffeshopSound,
    fireplaceSound: fireplaceSound,
    forestSound: forestSound,
    rainSound: rainSound,
}
