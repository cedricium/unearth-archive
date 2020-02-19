exports.seed = function(knex) {
  return knex('things').insert([
    {
      id: 'f5vhka',
      subreddit: 'funny',
      selftext: '',
      author_fullname: 't2_3qd73qyv',
      title: 'Always the same story',
      subreddit_name_prefixed: 'r/funny',
      name: 't3_f5vhka',
      category: null,
      score: 12044,
      thumbnail:
        'https://b.thumbs.redditmedia.com/lSp_oC8DkVde7sTVw70IRGBlEYTqCbwZqFMG_SYfbJg.jpg',
      over_18: false,
      author: 'testuser',
      permalink: '/r/funny/comments/f5vhka/always_the_same_story/',
      url: 'https://i.redd.it/gzpriy61yph41.jpg',
      created_utc: 1582047527,
      surfaced: false,
      user_id: 'jk23d',
    },
  ])
}
