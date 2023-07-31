import * as el from "./elements.js"
import * as aud from "./audioAssets.js"
import state from "./state.js"

export class Sound {
    constructor(
        soundSection = el.soundSection, 
        soundControls = el.soundControls,
        soundFiles = aud.files,
        timerControls = el.timerControls
        ) {
            this.section = soundSection;
            this.controls = soundControls;
            this.forestSelector = soundControls.forestSoundSelector;
            this.rainSelector = soundControls.rainSoundSelector;
            this.coffeshopSelector = soundControls.coffeshopSoundSelector;
            this.fireplaceSelector = soundControls.fireplaceSoundSelector;
            this.timerControls = timerControls;
            this.soundFiles = soundFiles;
            this.currentSong = null            
        }           
    
    registerSoundActions = () => {
        this.section.addEventListener('click', (event) => {
            const action = event.target.dataset.action
            console.log(`Ação painel de som executada: ${action}`)
            this.soundSelector(action)
            return                 
        })
        document.addEventListener('timeUp', (event) => {
            this.stopAllSounds()
            this.untoggleAllBoxes()
        })        
    }

    registerTimerActions = () => {
        this.timerControls.controlsPanel.addEventListener('click', (event) => {
            const action = event.target.dataset.action
            if(typeof this[action] != "function") {
                return
            }
            this[action]()
            console.log(`Ação selecionada: ${action}`)
            return   
        })
    }

    soundSelector = (soundPanelAction) => {
        if (soundPanelAction == undefined) {
            return
        }                
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
    }
     
    toggleSoundSelected = (selectedSound, currentSoundControl) => {
        try {
            if (selectedSound == this.currentSong) {            
                this.currentSong = null
                currentSoundControl.classList.remove('selected-box')
            } else {
                this.currentSong = selectedSound              
                for(let element in this.controls){
                    this.controls[element].classList.remove('selected-box')
                }
                currentSoundControl.classList.add('selected-box')
            }
            this.stopAllSounds()
            if (state.isRunning){
                this.currentSong.play()
            }
            
        }
        catch (TypeError) {
            //pass
        }    
    }

    untoggleAllBoxes = () => {
        for(let element in this.controls){
            this.controls[element].classList.remove('selected-box')
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
        try {
            this.currentSong.pause()            
        }
        catch (TypeError) {
            //pass
        }
    }

    volumeTurnUp = () => {
        try {
            this.currentSong.volume = this.currentSong.volume+0.1    
        }
        catch (DOMException) {
            //pass
        }
    }

    volumeTurnDown = () => {
        try {
            this.currentSong.volume = this.currentSong.volume-0.1    
        }
        catch (DOMException) {
            //pass
        }
    }

    stopAllSounds = () => {
        for(let sound in this.soundFiles){
            this.soundFiles[sound].pause()
            this.soundFiles[sound].currentTime = 0
        }   
        return
    }
}
