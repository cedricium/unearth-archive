exports.seed = function(knex) {
  return knex('things').insert([
    {
      id: 'davrji',
      subreddit: 'node',
      selftext: '',
      author_fullname: 't2_25vyrwt9',
      title: 'How to Learn Software Design and Architecture [Roadmap]',
      subreddit_name_prefixed: 'r/node',
      name: 't3_davrji',
      category: null,
      score: 193,
      thumbnail:
        'https://b.thumbs.redditmedia.com/nX6rMBfgNCa_mTfysGBJPc8k5OmdUi2vcGtZEeVUvPc.jpg',
      over_18: false,
      author: 'stemmlerjs',
      permalink:
        '/r/node/comments/davrji/how_to_learn_software_design_and_architecture/',
      url: 'https://khalilstemmler.com/software-design-roadmap',
      created_utc: 1569767049,
      surfaced: false,
      user_id: 1,
    },
  ])
}
