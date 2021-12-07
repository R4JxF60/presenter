const { ipcRenderer } = require('electron');
const fs = require('fs');
const { getFileInfo } = require('../api/slideAPI.js');
const bodyElement = document.querySelector('body');
const domParser = new DOMParser();

let parentPath;

getFileInfo().then(info => {
    parentPath = info.parentPath;
    const styleTag = domParser.parseFromString(info.style, 'text/html').querySelector('head').firstChild;
    bodyElement.appendChild(styleTag);
}).catch(err => {
    console.log(err);
})

ipcRenderer.on('post:slide-info', (event, slide) => {
    try {
        const htmlStr = fs.readFileSync(parentPath.concat(slide.html), 'utf-8');
        const slideElement = domParser.parseFromString(htmlStr, 'text/html').querySelector('body').firstChild;
        const slideSection = document.querySelector('section');
        slideSection.parentNode.replaceChild(slideElement, slideSection);
    } catch(err) {
        console.log(err);
    }
    
});