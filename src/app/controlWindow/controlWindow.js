import createComponent from '../../flux/createComponent/createComponent.js';
import ControlCard from './components/ControlCard/ControlCard.js';
import DisplayCard from './components/DisplayCard/DisplayCard.js';
import InfoCard from './components/InfoCard/InfoCard.js';
import controlCardEvents from './components/ControlCard/controlCardEvents.js';
import store from '../../flux/store/index.js';
const { ipcRenderer } = require('electron'); 
const { getFileInfo, requestSlide } = require('../api/slideAPI.js');
const { pause, play, end } = require('../api/internalAPI.js')

let element;
let windowNodes = {};
let bodyElement = document.querySelector('body');

const subscriber = (state, action) => {
    if(action.type === controlCardEvents.SELECT_A_SLIDE) {
        requestSlide(state.controlCard.selectedSlide);
    }
    if(action.type === controlCardEvents.PAUSE_SLIDESHOW) {
        pause();
    }
    if(action.type === controlCardEvents.PLAY_SLIDESHOW) {
        play();
    }
    if(action.type === controlCardEvents.END_SLIDESHOW) {
        end();
    }
};

getFileInfo().then(info => {
    store.setSubscriber('controlWindow', subscriber);

    const infoCard = new InfoCard({filename: info.filename, total: info.total});
    window.infoCard = infoCard;
    windowNodes['infoCard'] = infoCard;
    element = createComponent(infoCard);
    bodyElement.appendChild(element);

    const displayCard = new DisplayCard({});
    window.displayCard = displayCard;
    windowNodes['displayCard'] = displayCard;
    element = createComponent(displayCard);
    bodyElement.appendChild(element);

    const controlCard = new ControlCard({total: info.total});
    window.controlCard = controlCard;
    windowNodes['controlCard'] = controlCard;
    element = createComponent(controlCard);
    bodyElement.appendChild(element);

}).catch(err => {
    console.log(err);
});

ipcRenderer.on('post:slide-info', (event, slide) => {
    windowNodes['displayCard'].updateSpeakerNote(slide.speakerNote || '');
});