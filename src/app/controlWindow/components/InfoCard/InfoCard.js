import Component from "../../../../flux/component/Component.js";
import controlCardEvents from "../ControlCard/controlCardEvents.js";
import initState from "../ControlCard/initState.js";

class InfoCard extends Component{
    constructor(props = {}) {
        super(props);
        this.subscriber = this.subscriber.bind(this);
        this.render = this.render.bind(this);
        this.setSubscriber('infoCard', this.subscriber);
    }

    subscriber(state, action) {
        console.log(state);
        if(action.type === controlCardEvents.SELECT_A_SLIDE) {
            this.refs.slideOfTotal.innerText = state.controlCard.selectedSlide;
        }
    }

    render() {
        return `
            <div class="info__card">
                <!-- info -->
                <div class="info__card__pre__name">
                    <!-- presentation name -->
                    <div><p>${this.props.filename}</p></div>
                </div>

                <div class="info__card__pre__info">
                    <div><p>Speaker notes</p></div>
                    <div><p>Slide <span data-ref="slideOfTotal">0</span> of <span>${this.props.total}</span></p></div>
                </div>
            </div>
        `;
    }
}

export default InfoCard;