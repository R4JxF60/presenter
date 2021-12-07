import Component from "../../../../flux/component/Component.js";
import controlCardEvents from "../ControlCard/controlCardEvents.js";
const { desktopCapturer } = require('electron');

class DisplayCard extends Component {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.updateSpeakerNote = this.updateSpeakerNote.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
    }

    handleVideo(videoElement) {
        desktopCapturer.getSources({ types: ['window', 'screen'] }).then( async sources => {
            for (const source of sources) {
              if (source.name === 'slideshow') {
                  try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            audio: false,
                            video: {
                                mandatory: {
                                chromeMediaSource: 'desktop',
                                chromeMediaSourceId: source.id,
                                    minWidth: 640,
                                    minHeight: 360,
                                    maxWidth: 1120,
                                    maxHeight: 630
                                }
                            }
                        });
                        videoElement.srcObject = stream;
                        videoElement.onloadedmetadata = (e) => videoElement.play();
                  } catch (e) {
                      console.log(e);
                  }
                return;
              }
            }
        });
    } 

    updateSpeakerNote(speakerNote) {
        this.refs.speakerNote.textContent = speakerNote;
    }

    onCreate() {
        this.handleVideo(this.refs.slideVideo);
    }

    render() {
        return `
            <div class="display__card">
                <div class="display__card__video">
                    <!-- display capture -->
                    <video data-ref="slideVideo"></video>
                </div>
                <div class="display__card__notes"> <!-- speaker notes -->
                    <div data-ref="speakerNote">
                        <!-- speaker notes -->
                    </div>
                </div>
            </div>
        `;
    }
}

export default DisplayCard;