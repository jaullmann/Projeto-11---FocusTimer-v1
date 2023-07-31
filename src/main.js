import { Sound } from "./sound.js"
import { Timer } from "./timer.js"

const soundUserControl = new Sound()
const timerUserControl = new Timer()

soundUserControl.registerSoundActions()
soundUserControl.registerTimerActions()
timerUserControl.registerTimerActions()
timerUserControl.setMinutes()
