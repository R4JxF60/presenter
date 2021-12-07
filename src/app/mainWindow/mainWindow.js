const { ipcRenderer } = require('electron');

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const { path } = document.querySelector('input').files[0];
    ipcRenderer.send('json-file-path', path);
});