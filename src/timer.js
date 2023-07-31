import * as el from "./elements.js"
import state from "./state.js"

export class Timer {
    constructor(        
        timerMinutesDisplay = el.timerDisplay.minutesDisplay,
        timerSecondsDisplay = el.timerDisplay.secondsDisplay,
        controlsPanel = el.timerControls.controlsPanel,
        playButton = el.timerControls.playButton,
        pauseButton = el.timerControls.pauseButton
        ) {
            this.timerMinutesDisplay = timerMinutesDisplay;
            this.timerSecondsDisplay = timerSecondsDisplay;
            this.controlsPanel = controlsPanel;
            this.playButton = playButton;
            this.pauseButton = pauseButton;
            this.currentMinute = state.minutes;
            this.currentSecond = state.seconds;
            this.timeUpEvent = new CustomEvent("timeUp")
        }

    registerTimerActions = () => {
        this.controlsPanel.addEventListener('click', (event) => {
            const action = event.target.dataset.action
            if(typeof this[action] != "function") {
                return
            }
            this[action]()
            console.log(`Ação selecionada: ${action}`)
            return                   
        })
    }

    set = () => {
        this.timerMinutesDisplay.setAttribute('contenteditable', true)
        this.timerMinutesDisplay.focus()
    }

    setMinutes = () => {
        this.timerMinutesDisplay.addEventListener('focus', () => {            
            this.timerMinutesDisplay.textContent = ""            
        })
        
        this.timerMinutesDisplay.onkeypress = (event) => /\d/.test(event.key)

        this.timerMinutesDisplay.addEventListener('blur', (event) => {
            
            let time = event.currentTarget.textContent
            time = time > 60 ? 60 : time
            state.minutes = time
            state.seconds = 0

            this.updateDisplay()
            this.timerMinutesDisplay.removeAttribute('contenteditable')
        })
    }


    timerDisplayCountdown = () => { 
        if (!state.isRunning || state.isOver) {
            return
        }
        this.currentMinute = Number(this.timerMinutesDisplay.textContent)
        this.currentSecond = Number(this.timerSecondsDisplay.textContent)

        this.currentSecond--

        if(this.currentSecond < 0) {
            this.currentSecond = 59
            this.currentMinute--
        }

        if (this.currentMinute < 0) {
            state.isRunning = false
            state.isOver = true
            this.timerReset()
            document.dispatchEvent(this.timeUpEvent)
            return
        }        
        
        this.updateDisplay(this.currentMinute, this.currentSecond)

        setTimeout(() => this.timerDisplayCountdown(), 1000)
    }

    updateDisplay = () => {
        this.timerMinutesDisplay.textContent = String(this.currentMinute).padStart(2, "0")
        this.timerSecondsDisplay.textContent = String(this.currentSecond).padStart(2, "0")
    }

    timerPlay = () => {
        state.isRunning = true
        state.isOver = false        
        this.switchPlayPauseButtons()
        this.timerDisplayCountdown()        
        return        
    }

    timerPause = () => {
        state.isRunning = false
        state.isOver = false 
        this.switchPlayPauseButtons()
        return
    }

    timerStop = () => {
        state.isRunning = false
        state.isOver = true
        this.playButton.classList.remove('hide')
        this.pauseButton.classList.add('hide')
        this.timerReset()
        return        
    }   
    
    timerReset = () => {
        this.currentMinute = state.minutes
        this.currentSecond = state.seconds
        this.updateDisplay()        
        return
    }

    switchPlayPauseButtons = () => {
        this.playButton.classList.toggle('hide')
        this.pauseButton.classList.toggle('hide')
        return
    }

}