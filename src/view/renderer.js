const {ipcRenderer} = require('electron');

/**
 * This sniped of the script catch the Enter keyboard event
 * and throw a ipcRenderer event to search in bible db.
 */
const searchInputElement = document.getElementById('search-input');
searchInputElement.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const eventValue = event.target.value;
    ipcRenderer.invoke('search-event', eventValue);
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowRight') {
    ipcRenderer.invoke('next-event');
  } else if (event.key === 'ArrowLeft') {
    console.log('prev');
  }
}, true);
