import axios from 'axios'

export const getSavedThings = ({
  username,
  accessToken,
  things = [],
  after = '',
  count = 0
}) => {
  return new Promise(async (resolve, reject) => {
    const REDDIT_API_HOST = 'https://oauth.reddit.com'
    const REDDIT_SAVED_ENDPOINT = 
      `/user/${username}/saved?&limit=100&count=${count}&after=${after}&raw_json=1`
    try {
      const { data } = (await axios.get(
        `${REDDIT_API_HOST}${REDDIT_SAVED_ENDPOINT}`, {
        headers: {
          'Authorization': `bearer ${accessToken}`
        }
      })).data
      things = [...things, ...data.children]
      if (data.after) {
        after = data.after
        resolve(getSavedThings({username, accessToken, things, after, count: count += 100}))
      } else {
        resolve(things)
      }
    } catch (error) {
      reject(error)
    }
  })
}
