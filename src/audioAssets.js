const forestSound = new Audio('./assets/forest.wav')
const rainSound = new Audio('./assets/rain.wav')
const coffeshopSound = new Audio('./assets/coffeShop.wav')
const fireplaceSound = new Audio('./assets/fireplace.wav')

forestSound.loop = true
rainSound.loop = true
coffeshopSound.loop = true
fireplaceSound.loop = true

forestSound.volume = 0.5
rainSound.volume = 0.5
coffeshopSound.volume = 0.5
fireplaceSound.volume = 0.5

export const files = {
    forestSound: forestSound,
    rainSound: rainSound,
    coffeshopSound: coffeshopSound,
    fireplaceSound: fireplaceSound,
}
