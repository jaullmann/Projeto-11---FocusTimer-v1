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
            this.currentSong = null;
            this.currentSongControl = null     
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
            this.toggleSoundSelectorColor('unselectAll')
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
                this.currentSongControl = this.forestSelector
                this.toggleSoundSelected(this.soundFiles.forestSound)
                break
            case 'toggleRainSound':
                this.currentSongControl = this.rainSelector
                this.toggleSoundSelected(this.soundFiles.rainSound)
                break
            case 'toogleCoffeshopSound':
                this.currentSongControl = this.coffeshopSelector
                this.toggleSoundSelected(this.soundFiles.coffeshopSound)
                break
            case 'toogleFireplaceSound':
                this.currentSongControl = this.fireplaceSelector
                this.toggleSoundSelected(this.soundFiles.fireplaceSound)
                break            
        }
        return
    }
     
    toggleSoundSelected = (selectedSound) => {        
        if (this.currentSong == null) {
            this.currentSong = selectedSound
            this.toggleSoundSelectorColor('select')
            this.playPauseCurrentSong()
        } else if (this.currentSong == selectedSound && (state.isRunning || state.isOver)) {                              
            this.playPauseCurrentSong()
            this.currentSong = null       
            this.toggleSoundSelectorColor('unselect')
        } else if (this.currentSong == selectedSound && state.isRunning){
            this.playPauseCurrentSong()
            this.toggleSoundSelectorColor('toggle')
        } else {
            this.toggleSoundSelectorColor('unselectAll')
            this.stopAllSounds()
            this.currentSong = selectedSound
            this.playPauseCurrentSong()
            this.toggleSoundSelectorColor('select')
        }        
    }

    toggleSoundSelectorColor = (actionType) => {
        const currentButtonControl = this.currentSongControl.querySelector(".ph-button")
        const currentSliderControl = this.currentSongControl.querySelector("input")        
        switch (actionType) {
            case 'select':
                this.currentSongControl.classList.add('selected-box')
                currentButtonControl.classList.add('selected-button')
                currentSliderControl.classList.add('selected-slider')
                return
            case 'unselect':
                this.currentSongControl.classList.remove('selected-box')
                currentButtonControl.classList.remove('selected-button')
                currentSliderControl.classList.remove('selected-slider')
                return
            case 'toggle':
                this.currentSongControl.classList.toggle('selected-box')
                currentButtonControl.classList.toggle('selected-button')
                currentSliderControl.classList.toggle('selected-slider')
                return
            case 'unselectAll':
                for(let element in this.soundControls){
                    this.soundControls[element].classList.remove('selected-box')
                    this.soundControls[element].querySelector("button").classList.remove('selected-button')
                    this.soundControls[element].querySelector("input").classList.remove('selected-slider')
                }
                return
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
            this.toggleSoundSelectorColor('unselectAll')
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


