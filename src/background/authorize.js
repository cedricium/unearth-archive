// TODO: enable `identity` permission for Google Chrome
// To setup `identity` with Google Chrome, see below:
// - https://developer.chrome.com/apps/app_identity
// - https://developer.chrome.com/extensions/manifest/key

function extractCode(redirectUri) {
  let m = redirectUri.match(/[#?](.*)/);
  if (!m || m.length < 1)
    return null;
  let params = new URLSearchParams(m[1].split('#')[0]);
  return params.get('code');
}

function validate(redirectURL) {
  return extractCode(redirectURL);
}

function authorize() {
  const redirectURL = browser.identity.getRedirectURL();
  const clientID = 'UYfIu0DkrdqhMg';
  const scopes = ['history', 'identity'];
  let authURL = 'https://www.reddit.com/api/v1/authorize';
  authURL += `?client_id=${clientID}`;
  authURL += `&response_type=code`;
  authURL += `&state=test`;
  authURL += `&redirect_uri=${encodeURIComponent(redirectURL)}`;
  authURL += `&duration=permanent`;
  authURL += `&scope=${encodeURIComponent(scopes.join(' '))}`;

  return browser.identity.launchWebAuthFlow({
    interactive: true,
    url: authURL
  });
}

function getAuthCode() {
  return authorize().then(validate);
}

/**
 *
 * @param {String} code Authorization code used to generate an access token.
 */
function getAccessToken(code) {
  const client_id = 'UYfIu0DkrdqhMg';
  const client_secret = '';
  const redirectURI = encodeURIComponent(browser.identity.getRedirectURL());
  const params = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectURI}`;
  const url = 'https://www.reddit.com/api/v1/access_token';

  return fetch((url), {
    method: 'POST',
    body: params,
    headers: new Headers({
      'authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
      'content-type': 'application/x-www-form-urlencoded',
    }),
  }).then((data) => {
    return data.json();
  }).then((data) => {
    const accessToken = data['access_token'];
    const refreshToken = data['refresh_token'];
    return {accessToken, refreshToken};
  });
}

/**
 * Checks the validity of the given access token.
 * @param {String} accessToken Reddit access token to verify
 * @returns {Boolean} True if given access token is valid, false otherwise
 */
async function isAccessTokenValid(accessToken) {
  const {username} = (await browser.storage.local.get('username'));
  const VALIDATION_BASE_URL = `https://oauth.reddit.com/user/${username}/saved`;
  return fetch(VALIDATION_BASE_URL, {
    headers: new Headers({
      'Authorization': `bearer ${accessToken}`
    })
  }).then((response) => {
    return response.json();
  }).then((json) => {
    return new Promise((resolve, reject) => {
      if (!json.error && json.data) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

/**
 * @returns {String} accessToken - newly-generated access token
 */
function refreshAccessToken(refreshToken) {
  // const client_id = 'WUrA1UKwecf2Kg'; // code flow
  const client_id = 'UYfIu0DkrdqhMg'; // implicit grant flow
  const client_secret = '';
  const params = `grant_type=refresh_token&refresh_token=${refreshToken}`;
  const url = 'https://www.reddit.com/api/v1/access_token';

  return fetch((url), {
    method: 'POST',
    body: params,
    headers: new Headers({
      'authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
      'content-type': 'application/x-www-form-urlencoded',
    }),
  }).then((data) => {
    return data.json();
  }).then(async (data) => {
    const accessToken = data['access_token'];
    (await browser.storage.local.set({accessToken: accessToken}));
    return accessToken;
  });
}

function getUsername(accessToken) {
  return fetch('https://oauth.reddit.com/api/v1/me', {
    headers: new Headers({
      'Authorization': `bearer ${accessToken}`
    })
  })
  .then((data) => {
    return data.json();
  }).then(async (data) => {
    const username = data['name'];
    (await browser.storage.local.set({username: username}));
    return username;
  });
}
