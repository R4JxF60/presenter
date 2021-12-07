const { ipcRenderer } = require('electron');

const pause = () => {
    ipcRenderer.send('post:pause', {});
}

const play = () => {
    ipcRenderer.send('post:play', {});
}

const end = () => {
    ipcRenderer.send('post:end', {});
}

module.exports = {
    pause: pause,
    play: play,
    end: end
};