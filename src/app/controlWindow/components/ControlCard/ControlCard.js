import Component from "../../../../flux/component/Component.js";
import initState from "./initState.js";
import controlCardEvents from "./controlCardEvents.js";
import controlCardActions from "./controlCardActions.js";
import controlCardReducer from "./controlCardReducer.js";

class ControlCard extends Component {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.pause = this.pause.bind(this);
        this.end = this.end.bind(this);
        this.before = this.before.bind(this);
        this.next = this.next.bind(this);
        this.directSelect = this.directSelect.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.setSubscriber('controlCard', this.subscriber);
        this.setReducer('controlCard', controlCardReducer, initState);
    }

    subscriber(state, action) {
        if(action.type === controlCardEvents.SELECT_A_SLIDE) {
            this.refs.currentSlide.innerText = state.controlCard.selectedSlide;
            this.refs.pageLeft.innerText = this.props.total - state.controlCard.selectedSlide;
        }
    }

    next() {
        if(!this.getState().controlCard.paused) {
            let nextSlide = parseInt(this.refs.currentSlide.innerText) + 1;
            if(nextSlide > this.props.total) {
                return;
            }
            this.dispatch(controlCardActions.selectASlide(nextSlide));
        }
    }

    before() {
        if(!this.getState().controlCard.paused) {
            let beforeSlide = parseInt(this.refs.currentSlide.innerText) - 1;
            if(beforeSlide < 1) {
                return;
            }
            this.dispatch(controlCardActions.selectASlide(beforeSlide));
        }
    }

    pause() {
        if(this.getState().controlCard.paused) {
            this.dispatch(controlCardActions.playSlideShow());
            return;
        }
        this.dispatch(controlCardActions.pauseSlideShow());
    }

    end() {
        this.dispatch(controlCardActions.endSlideShow());
    }

    directSelect(event) {
        if(!this.getState().controlCard.paused) {
            let selectedSlide = parseInt(event.target.getAttribute('data-js'));
            this.dispatch(controlCardActions.selectASlide(selectedSlide));
        }
    }

    onCreate() {
        this.dispatch(controlCardActions.selectASlide(initState.selectedSlide));
        document.addEventListener('keydown', (event) => {
            if(event.key === 'ArrowLeft') {
                this.before();
            }
            if(event.key === 'ArrowRight') {
                this.next();
            }
        })
    }

    render() {
        let htmlStr = `
            <div class="control__card">
                <!-- controls -->
                <div class="control__card--dropdown">
                
                <!-- drop down -->
                <div class="control__card--dropdown--slide">`;
                if(this.props.total) {
                    for(let i=1; i <= this.props.total; i++) {
                        htmlStr = htmlStr.concat(`<div onclick="window.controlCard.directSelect(event)" data-js="${i}">Slide ${i}</div>`);
                    }
                }
                    
                htmlStr = htmlStr.concat(`</div>
                    <div class="control__card--dropdown--button">
                        <div>Slides</div> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#333333"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                    </div>
                    
                </div>

                <div class="control__card__controllers">
                    <!-- slide show control -->
                    <div onclick="window.controlCard.pause(event)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#333333"><path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"/></svg></div>
                    <div onclick="window.controlCard.before(event)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#333333"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.91 6.71c-.39-.39-1.02-.39-1.41 0L8.91 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L11.03 12l3.88-3.88c.38-.39.38-1.03 0-1.41z"/></svg></div>
                    <div><p>Slide <span data-ref="currentSlide">${initState.selectedSlide}</span></p></div>
                    <div onclick="window.controlCard.next(event)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#333333"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.31 6.71c-.39.39-.39 1.02 0 1.41L13.19 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01z"/></svg></div>
                    <div onclick="window.controlCard.end(event)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#333333"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg></div>
                </div>

                <div>
                    <!-- pages lefts -->
                    <p><span data-ref="pageLeft">${this.props.total - 1}</span> Slides left</p>
                </div>
            </div>
        </div>`);
        return htmlStr;
    }
}

export default ControlCard;