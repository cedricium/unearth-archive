const _ = require('underscore');

function init() {
  const yearText = document.getElementById('year');
  yearText.textContent = new Date().getUTCFullYear();

  const shuffleBtn = document.getElementById('shuffle');
  shuffleBtn.addEventListener('click', shuffleHandler);
  document.addEventListener('DOMContentLoaded', shuffleHandler);

  document.addEventListener('keyup', (e) => {
    if (e.keyCode === 32) shuffleBtn.click();
  });
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) e.preventDefault();
  });
}

const shuffleHandler = _.debounce(() => {
  handleSavePostsRetrieval();
}, 333);

async function handleSavePostsRetrieval() {
  // get accessToken from background script (which verifies its validity first),
  // as well as the username of the authorized user
  const accessToken = (await browser.runtime.sendMessage({request: 'accessToken'}));
  const {username, after, before} = (await browser.storage.local.get(
    ['username', 'after', 'before']
  ));

  // given the accessToken, get saved posts and create the boxes
  await getSavedPosts(accessToken, username, after, before);
}

function getSavedPosts(accessToken, username, after = null, before = null) {
  let redditApiURL = `https://oauth.reddit.com/user/${username}/saved/`
  redditApiURL += `?raw_json=1`;
  redditApiURL += `&type=links`;
  redditApiURL += `&limit=100`;

  if (after) {
    redditApiURL += `&after=${after}`;
  }

  fetch(redditApiURL, {
    headers: new Headers({
      'Authorization': `bearer ${accessToken}`
    })
  })
  .then((data) => {
    return data.json();
  }).then(async ({data}) => {
    console.log(data);
    const {after} = data;
    const {before} = data;

    (await browser.storage.local.set({
      after: after,
      before: before
    }));

    const posts = data.children;
    replaceCurrentPosts(posts);
  }).catch((err) => {
    console.error(err);
  });
}

function replaceCurrentPosts(posts) {
  // TODO: filtering posts marked as NSFW
  // toggled via a setting ("hide NSFW content")
  // Implementation:
  //  - get settings from local storage
  //  - check if settings.hideNSFW is enabled / true
  //  - if true:
  //    `posts = _.reject(posts, function(post){ return post.data['over_18'] === true; });`
  posts = _.sample(posts, 3);
  let boxes = document.getElementsByClassName('box');
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    box.animate('zoomOut', onAnimationComplete(box, 0, posts[i]));
  }
}

function onAnimationComplete(el, opacity, post) {
  switch (opacity) {
    case 0:
      el.style.opacity = opacity;
      setTimeout(() => {
        el.setAttribute('href', post.data.url);
        const content = el.querySelector('div.content');
        let contentTemplate =
`<p class="ue-title">${post.data.title}</p>
<small class="has-text-weight-bold is-pulled-left">r/${post.data.subreddit}</small>
<small class="has-text-weight-bold is-pulled-right is-orangered">${scoreFormatter(parseInt(post.data.score))}</small>`;
        contentTemplate = DOMPurify.sanitize(contentTemplate);
        content.innerHTML = contentTemplate;
      }, 250);
      break;
    case 1:
      el.style.opacity = opacity;
      return;
  }
  setTimeout(() => {
    el.animate('zoomIn', onAnimationComplete(el, 1), post);
  }, 1000);
}

/**
 * Helper function that emulates the format of numbers found on reddit.
 * Ex. 123 => "123"
 * Ex. 74324 => "74.3k"
 * Ex. 3298939 => "3.3m"
 * @param {Number} num Score of given reddit post to be formatted
 */
function scoreFormatter(num) {
  if (num > 999999) return (num / 1000000).toFixed(1) + 'm';
  else if (num > 999) return (num / 1000).toFixed(1) + 'k';
  else return num;
}

init();
