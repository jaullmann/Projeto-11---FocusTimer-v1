import { darkModeToggle as dm} from "./elements.js";

export class Theme {
    constructor(
        themeSelector = dm.themeSelector,
        darkModeToggle = dm.darkModeButton,
        lightModeToggle = dm.lightModeButton,
    ) {
            this.themeSelector = themeSelector;
            this.darkModeToggle = darkModeToggle;
            this.lightModeToggle = lightModeToggle;
        }

    toggleDarkMode = () => {
        document.body.classList.add('dark-mode')
        this.switchDarkModeButtons()
    }

    toggleLightMode = () => {
        document.body.classList.remove('dark-mode')
        this.switchDarkModeButtons()
    }

    switchDarkModeButtons = () => {
        this.darkModeToggle.classList.toggle('hide')
        this.lightModeToggle.classList.toggle('hide')
    }

    registerThemeActions = () => {
        this.themeSelector.addEventListener('click', (event) => {
            const action = event.target.dataset.action   
            if (typeof this[action] != "function") {
                return
            }
            this[action]()
            console.log(`Ação selecionada: ${action}`)
            return 
        })
    }

}

