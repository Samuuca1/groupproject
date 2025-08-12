let popperInstance = null;
let player = null;

const button = document.querySelector('#videoBtn');
const tooltip = document.querySelector('#videoPopper');

function createPopperInstance() {
  popperInstance = Popper.createPopper(button, tooltip, {
    placement: 'right',
    modifiers: [
      { name: 'offset', options: { offset: [0, 10] } }
    ]
  });
}

function showVideo() {
  tooltip.style.display = 'block';
  tooltip.innerHTML = `<div id="ytplayer"></div>`;
  createPopperInstance();

  // Create the YouTube player after the iframe API is ready
  player = new YT.Player('ytplayer', {
    height: '180',
    width: '320',
    videoId: 'ZXsQAXx_ao0',
    playerVars: { autoplay: 1, mute: 1 },
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function hideVideo() {
  tooltip.style.display = 'none';
  tooltip.innerHTML = '';
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    hideVideo();
  }
}

// Load video on hover (or click)
button.addEventListener('mouseenter', () => {
  if (!player) showVideo();
});