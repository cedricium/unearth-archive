async function handleInstalled(details) {
  // TODO: initialize default values for settings
  // Possible initial properties:
  //  - hideNSFW [true|false] (hides NSFW content from being displayed)
  //  - theme ['light'|'dark'] (new tab page theme)
  //  - removeOnceViewed [true|false] (removes a post from user's saved posts when viewed using unearth)
  // Implementation:
  //  - create object (`settings`) with above props and default values
  //  - save `settings` to local storage, using:
  //    `browser.storage.local.set({settings});`

  const { isAuthorized = false } =
    (await browser.storage.local.get('isAuthorized'));

  if (!isAuthorized) {
  // if (isAuthorized === true) { // for testing purposes
    const code = (await getAuthCode());
    const {accessToken, refreshToken} = (await getAccessToken(code));
    await browser.storage.local.set({
      isAuthorized: true,
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  }
  // we are authorized, check accessToken to see if we need to refresh...
  const {accessToken} = (await browser.storage.local.get('accessToken'));
  if (!(await isAccessTokenValid(accessToken))) {
    const {refreshToken} = (await browser.storage.local.get('refreshToken'));
    refreshAccessToken(refreshToken);
  }
  // get reddit username in order to retrieve saved posts later on
  const username = (await getUsername(accessToken));
  (await browser.storage.local.set({username: username}));
  // once our accessToken is valid, open a new tab
  browser.tabs.create({});
}

// handling of messages from the new tab page
function handleMessage({request}, sender, sendResponse) {
  switch (request) {
    case 'accessToken':
      return new Promise(async (resolve) => {
        const {accessToken} = (await browser.storage.local.get('accessToken'));
        if (!(await isAccessTokenValid(accessToken))) {
          const {refreshToken} = (await browser.storage.local.get('refreshToken'));
          const newAccessToken = refreshAccessToken(refreshToken);
          resolve(newAccessToken);
        } else {
          resolve(accessToken);
        }
      });
      break;
    default:
      sendResponse({error: 'unknown operation'});
      break;
  }
}

browser.runtime.onInstalled.addListener(handleInstalled);
browser.runtime.onMessage.addListener(handleMessage);
