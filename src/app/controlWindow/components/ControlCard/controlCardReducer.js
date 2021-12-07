import controlCardEvents from "./controlCardEvents.js";

const controlCardReducer = (state, action) => {
    switch(action.type) {
        case controlCardEvents.SELECT_A_SLIDE: {
            return Object.assign({}, state, {selectedSlide : action.value});
        }
        case controlCardEvents.PAUSE_SLIDESHOW: {
            return Object.assign({}, state, { paused: true, slideShowStates: 'pause'});
        }
        case controlCardEvents.PLAY_SLIDESHOW: {
            return Object.assign({}, state, { paused: false, slideShowStates: 'play'});
        }
        case controlCardEvents.END_SLIDESHOW: {
            return Object.assign({}, state, { slideShowStates: 'ended'});
        }
        default: return state;
    }
}

export default controlCardReducer;