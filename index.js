const showDetails = document.getElementById('detailsBtn');
const showStory = document.getElementById('storyBtn');
const detailsPanel = document.getElementById('detailsPanel');
const storyPanel = document.getElementById('storyPanel');

let urlLoop;
let emoji;
let clickWait = false;

function showDetailsPanel({noscroll = false, delay = 700}) {
  if (document.getElementById('detailsBtn').classList.contains('selected')) return;

  if (clickWait) return;
  clickWait = true;

  if (!noscroll && !bodyPanelInViewport()) scrollToBody();

  if (detailsPanel.classList.contains('showing')
    || storyPanel.classList.contains('block-details')) return;

  storyPanel.classList.remove('showing');
  urlTime();
  document.getElementById('detailsBtn').classList.add('selected');
  document.getElementById('storyBtn').classList.remove('selected');
  setTimeout(() => {
    document.body.classList.remove('story-length');
    storyPanel.classList.remove('showing');
    detailsPanel.classList.add('showing')
  }, delay);

  setTimeout(() => {
    clickWait = false;
  }, 900);
}

function showStoryPanel() {
  if (document.getElementById('storyBtn').classList.contains('selected')) return;

  if (clickWait) return;
  clickWait = true;

  if (detailsPanel.classList.contains('initial-load')) {
    storyPanel.classList.add('block-details');
  }

  detailsPanel.classList.remove('initial-load');

  if (!bodyPanelInViewport()) scrollToBody();

  if (storyPanel.classList.contains('showing')) return;

  detailsPanel.classList.remove('showing');
  urlHearts();
  document.body.classList.add('story-length');
  document.getElementById('storyBtn').classList.add('selected');
  document.getElementById('detailsBtn').classList.remove('selected');
  setTimeout(() => {
    detailsPanel.classList.remove('showing');
    storyPanel.classList.add('showing');
    storyPanel.classList.remove('block-details');
  }, 700);

  setTimeout(() => {
    clickWait = false;
  }, 900);
}

function scrollToBody() {
  const bodyNav = document.getElementById('bodyNav');

  bodyNav.scrollIntoView({
    behavior: 'smooth',
  });
}

function watchScrollFadeIn() {
  if (bodyPanelInViewport()) {
    detailsPanel.classList.add('showing')
  } else {
    let wait = false;

    document.addEventListener('scroll', function watchScroll() {
      if (wait) return;

      wait = true;

      if (bodyPanelInViewport()) {
        if (!storyPanel.classList.contains('block-details')) {
          showDetailsPanel({
            noscroll: true,
            delay: 0,
          });
        }
        document.removeEventListener('scroll', watchScroll);
      } else {
        setTimeout(() => {
          wait = false;
        }, 300);
      }
    });
  }
}

function bodyPanelInViewport() {
  const bodyPanel = document.getElementById('detailsPanel');
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const bodyBounding = bodyPanel.getBoundingClientRect();

  if (
    bodyBounding.bottom <= (viewportHeight + (bodyPanel.offsetHeight * 0.75))
  ) {
    return true;
  } else {
    return false;
  }
}

function watchPanelClick() {
  showDetails.addEventListener('click', showDetailsPanel);
  showStory.addEventListener('click', showStoryPanel);
}

function urlTime() {
  clearTimeout(urlLoop);

  emoji = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];

  function loop() {
    location.hash = emoji[Math.floor((Date.now()/100) % emoji.length)];

    urlLoop = setTimeout(loop, 50);
  }

  loop();
}

function urlHearts() {
  clearTimeout(urlLoop);

  emoji = ['💓', '💗', '💖', '💝', '💝', '💝'];

  function loop() {
    location.hash = emoji[Math.floor((Date.now()/100) % emoji.length)];

    urlLoop = setTimeout(loop, 110);
  }

  loop();
}

function addCountdown() {
  const countdownEl = document.getElementById('countdown');
  const weddingDay = new Date('Jul 20, 2019 00:00:00').getTime();
  const now = new Date().getTime();
  const countdown = Math.floor((weddingDay - now) / (1000 * 60 * 60 * 24)); 
  const s = Math.abs(countdown) !== 1 ? 's' : '';

  if (countdown >= 0) {
    countdownEl.innerHTML = countdown + ' day' + s + ' to go!';
  } else {
    countdownEl.innerHTML = Math.abs(countdown) + ' day' + s + ' ago!';
  }
}

watchPanelClick();
watchScrollFadeIn();
addCountdown();
