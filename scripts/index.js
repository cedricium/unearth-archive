const db = require('../database/config')
const data = require('../res/saved_things_ced.json')

/**
 * Function to determine whether or not a given property exists in a nested object.
 * @param {Object} object JavaScript object to test against
 * @param {*} level the desired-level property to begin the search
 * @param  {...any} rest the remaining deeper-levels to search in
 * @returns {Boolean} - true if property exists in the given levels, false otherwise
 *
 * References: https://stackoverflow.com/a/2631198/6698029
 */
const hasOwnNestedProperty = (object, level, ...rest) => {
  if (object === undefined) return false
  if (rest.length === 0 && object.hasOwnProperty(level)) return true
  return hasOwnNestedProperty(object[level], ...rest)
}

/**
 * Function that corrects the broken URLs given for images in the Reddit saves JSON.
 * `&amp;` is used literally in the URLs which then result in HTTP 403, however,
 * simply using the `&` character in the query parameters fixes the issue.
 * @param {String} url URL of an image hosted on `external-preview.redd.it`
 */
const fixBrokenLink = url => {
  if (!url) return null
  return url.replace(/amp;/g, '')
}

const insertSavesToDB = async () => {
  try {
    const { children } = data.data
    await db('things').insert(
      children.map(child => {
        return {
          id: child.data.id,
          subreddit: child.data.subreddit,
          selftext: child.data.selftext,
          author_fullname: child.data.author_fullname,
          title: child.data.link_title || child.data.title,
          subreddit_name_prefixed: child.data.subreddit_name_prefixed,
          name: child.data.name,
          category: child.data.category,
          thumbnail: hasOwnNestedProperty(child.data, 'preview', 'images')
            ? fixBrokenLink(child.data.preview.images[0].source.url)
            : null,
          author: child.data.author,
          permalink: child.data.permalink,
          url: child.data.url,
          created_utc: child.data.created_utc,
          over_18: child.data.over_18,
          user_id: 'a9cqu',
          surfaced: false,
        }
      }),
    )
    db.destroy()
  } catch (error) {
    console.error(error)
    db.destroy()
    process.exit(1)
  }
}

insertSavesToDB()
