import { Sound } from "./sound.js"
import { Timer } from "./timer.js"

export const soundUserControl = new Sound()
export const timerUserControl = new Timer()

soundUserControl.registerControls()
timerUserControl.registerActions()

soundUserControl.checkTimerState()