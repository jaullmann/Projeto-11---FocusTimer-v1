import * as el from "./elements.js"
import * as aud from "./audioAssets.js"
import state from "./state.js"

export class Sound {
    constructor(
        soundSection = el.soundSection, 
        soundControls = el.soundControls,
        volumeControls = el.volumeControls,
        soundFiles = aud.files,
        timerControls = el.timerControls,
        ) {
            this.section = soundSection;
            this.soundControls = soundControls;
            this.volumeControls = volumeControls;
            this.forestSelector = soundControls.forestSoundSelector;
            this.rainSelector = soundControls.rainSoundSelector;
            this.coffeshopSelector = soundControls.coffeshopSoundSelector;
            this.fireplaceSelector = soundControls.fireplaceSoundSelector;
            this.timerControls = timerControls.controlsPanel;
            this.soundFiles = soundFiles;           
            this.isPlaying = false;            
            this.currentSong = null      
        }           
    
    registerSoundActions = () => {
        this.section.addEventListener('click', (event) => {
            const action = event.target.dataset.action
            if (action != undefined) {
                console.log(`Ação painel de som executada: ${action}`)
                this.soundSelector(action)                
                return
            }                     
        })
    }

    registerTimerActions = () => {
        this.timerControls.addEventListener('click', (event) => {
            const action = event.target.dataset.action
            if(typeof this[action] != "function") {
                return                               
            }
            this[action]()
            console.log(`Ação sound.js selecionada: ${action}`) 
            return
        }) 
    }
    
    captureTimeUpEvent = () => {
        document.addEventListener('timeUp', () => {
            this.stopAllSounds()
            this.untoggleAllBoxes()
        })        
    }

    setVolumeControls = () => {
        this.volumeControls.forestVolumeControl.addEventListener('change', () => {
            this.soundFiles.forestSound.volume = this.volumeControls.forestVolumeControl.value
        })
        this.volumeControls.rainVolumeControl.addEventListener('change', () => {
            this.soundFiles.rainSound.volume = this.volumeControls.rainVolumeControl.value
        })
        this.volumeControls.coffeshopVolumeControl.addEventListener('change', () => {
            this.soundFiles.coffeshopSound.volume = this.volumeControls.coffeshopVolumeControl.value
        })
        this.volumeControls.fireplaceVolumeControl.addEventListener('change', () => {
            this.soundFiles.fireplaceSound.volume = this.volumeControls.fireplaceVolumeControl.value
        })
    }

    soundSelector = (soundPanelAction) => {              
        switch(soundPanelAction) {
            case 'toggleForestSound':
                this.toggleSoundSelected(this.soundFiles.forestSound, this.forestSelector)
                break
            case 'toggleRainSound':
                this.toggleSoundSelected(this.soundFiles.rainSound, this.rainSelector)
                break
            case 'toogleCoffeshopSound':
                this.toggleSoundSelected(this.soundFiles.coffeshopSound, this.coffeshopSelector)
                break
            case 'toogleFireplaceSound':
                this.toggleSoundSelected(this.soundFiles.fireplaceSound, this.fireplaceSelector)
                break            
        }
        return
    }
     
    toggleSoundSelected = (selectedSound, currentSoundControl) => {        
        if (this.currentSong == null) {
            this.currentSong = selectedSound
            currentSoundControl.classList.add('selected-box')
            this.playPauseCurrentSong()
        } else if (this.currentSong == selectedSound && (state.isRunning || state.isOver)) {                              
            this.playPauseCurrentSong()
            this.currentSong = null             
            currentSoundControl.classList.remove('selected-box')
        } else if (this.currentSong == selectedSound && state.isRunning){
            this.playPauseCurrentSong()
            currentSoundControl.classList.toogle('selected-box')
        } else {
            this.untoggleAllBoxes()
            this.stopAllSounds()
            this.currentSong = selectedSound
            this.playPauseCurrentSong()
            currentSoundControl.classList.add('selected-box')
        }        
    }

    playPauseCurrentSong = () => {
        if (state.isRunning) {
            if (this.isPlaying) {
                this.currentSong.pause()
                this.isPlaying = false
            }
            else {
                this.currentSong.play()
                this.isPlaying = true
            }
        } else {
            this.isPlaying = false
        }      
    }

    switchSoundToggleColors = (soundControl, color) => {
        soundControl.querySelector('button').setAttribute('style', `color: ${color}`)
        soundControl.querySelector('input').setAttribute('style', `background: ${color}`)
        soundControl.querySelector('input').setAttribute('style', `accent-color: ${color}`)
    }

    resetSoundElementColors = () => {
        for(let element in this.soundControls){
            this.soundControls[element].classList.remove('selected-box')
            
        }
    }

    untoggleAllBoxes = () => {
        for(let element in this.soundControls){
            this.resetSoundElementColors()
            this.soundControls[element].classList.remove('selected-box')
            this.switchSoundToggleColors(this.soundControls[element], 'default')
        }
    }

    timerPlay = () => {
        try {                        
            this.currentSong.play() 
        }
        catch (TypeError) {            
            //pass
        }
    }

    timerStop = () => {
        try {
            this.stopAllSounds()
            this.untoggleAllBoxes()
            this.currentSong = null
            return
        } 
        catch (TypeError) {
            //pass
        }
    }   

    timerPause = () => {
        this.isPlaying = false
        try {
            this.currentSong.pause()            
        }
        catch (TypeError) {
            //pass
        }
    }    

    stopAllSounds = () => {
        this.isPlaying = false
        for(let sound in this.soundFiles){
            this.soundFiles[sound].pause()
            this.soundFiles[sound].currentTime = 0
        }   
        return
    }
}


