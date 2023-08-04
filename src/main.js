import { Sound } from "./sound.js"
import { Timer } from "./timer.js"
import { Theme } from "./darkmode.js"


const themeUserControl = new Theme()
const soundUserControl = new Sound()
const timerUserControl = new Timer()


themeUserControl.registerThemeActions()

soundUserControl.registerSoundActions()
soundUserControl.registerTimerActions()
soundUserControl.setVolumeControls()
soundUserControl.captureTimeUpEvent()

timerUserControl.registerTimerActions()
timerUserControl.setMinutes()
