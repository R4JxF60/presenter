const { ipcRenderer } = require('electron');

const getFileInfo = async () => {
     return ipcRenderer.invoke('get:file-info', {});
} 

const requestSlide = (slideNo) => {
    ipcRenderer.send('post:slide-info', slideNo);
}

module.exports = { 
    getFileInfo: getFileInfo ,
    requestSlide: requestSlide
};