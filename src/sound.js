import * as el from "./elements.js"
import * as aud from "./audioAssets.js"
import state from "./state.js"
import { timerUserControl } from "./main.js";

export class Sound {
    constructor(
        soundSection = el.soundSection, 
        soundControls = el.soundControls,
        soundFiles = aud.files
        ) {
            this.section = soundSection;
            this.controls = soundControls;
            this.forestSelector = soundControls.forestSoundSelector;
            this.rainSelector = soundControls.rainSoundSelector;
            this.coffeshopSelector = soundControls.coffeshopSoundSelector;
            this.fireplaceSelector = soundControls.fireplaceSoundSelector;
            this.soundFiles = soundFiles
            this.currentSong = null            
        }           
    
    registerControls = () => {
        this.section.addEventListener('click', (event) => {
            const action = event.target.dataset.action
            console.log(`Ação selecionada: ${action}`)
            this.soundPlay(action)
            return                  
        })
    }

    stopAllSounds = () => {
        for(let element in this.controls){
            this.controls[element].classList.remove('selected-box')
        }
        for(let sound in this.soundFiles){
            this.soundFiles[sound].pause()
            this.soundFiles[sound].currentTime = 0
        }   
        return
    }

    checkTimerState = () => {        
        if (!state.isRunning) {
            this.stopAllSounds()
        }                 
    }

    soundPlay = (selectedSound) => {
        if (selectedSound == this.currentSong) {
            this.currentSong = null
            this.stopAllSounds()            
            return
        }
        if (selectedSound != undefined){
            this.stopAllSounds()
        }                
        switch(selectedSound) {
            case 'toggleForestSound':
                this.currentSong = 'toggleForestSound'
                // this.soundFiles.forestSound.play()                
                this.forestSelector.classList.toggle('selected-box')
                break
            case 'toggleRainSound':
                this.currentSong = 'toggleRainSound'
                // this.soundFiles.rainSound.play()
                this.rainSelector.classList.toggle('selected-box')
                break
            case 'toogleCoffeshopSound':
                this.currentSong = 'toogleCoffeshopSound'
                // this.soundFiles.coffeshopSound.play()
                this.coffeshopSelector.classList.toggle('selected-box')
                break
            case 'toogleFireplaceSound':
                this.currentSong = 'toogleFireplaceSound'
                // this.soundFiles.fireplaceSound.play()
                this.fireplaceSelector.classList.toggle('selected-box')
                break
            default:
                console.log('nenhum som escolhido')
                break
        }
    }
    return
}
