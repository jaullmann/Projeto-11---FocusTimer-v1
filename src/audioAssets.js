const coffeshopSound = new Audio('./assets/coffeShop.wav')
const fireplaceSound = new Audio('./assets/fireplace.wav')
const forestSound = new Audio('./assets/forest.wav')
const rainSound = new Audio('./assets/rain.wav')

coffeshopSound.loop = true
fireplaceSound.loop = true
forestSound.loop = true
rainSound.loop = true

export const files = {
    coffeshopSound: coffeshopSound,
    fireplaceSound: fireplaceSound,
    forestSound: forestSound,
    rainSound: rainSound,
}
