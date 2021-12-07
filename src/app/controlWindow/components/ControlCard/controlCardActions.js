import createAction from "../../../../flux/actionCreator/actionCreator.js";
import controlCardEvents from "./controlCardEvents.js";

const controlCardActions = {
    selectASlide: createAction(controlCardEvents.SELECT_A_SLIDE),
    endSlideShow: createAction(controlCardEvents.END_SLIDESHOW),
    pauseSlideShow: createAction(controlCardEvents.PAUSE_SLIDESHOW),
    playSlideShow: createAction(controlCardEvents.PLAY_SLIDESHOW)
}

export default controlCardActions;