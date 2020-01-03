const router = require('express').Router()
const db = require('../../database/config')
const sendWelcomeEmail = require('../../mailers/sendWelcomeEmail')

router.get('/', async (req, res) => {})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [user] = await db('users').where({ id })
    if (!user) {
      return res.status(404).json({
        error: 'Could not find user with the provided id!',
      })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'An error occurred while processing your request.',
    })
  }
})

router.post('/', async (req, res) => {
  const { id, username } = req.body
  if (!id && !username) {
    return res.status(400).json({
      error: 'Missing required properties!',
    })
  }
  try {
    const user = { id, username }
    const [newUser] = await db('users')
      .insert(user)
      .returning(['id', 'username'])
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while processing your request.',
    })
  }
})

router.patch('/:id', async (req, res) => {
  const onboardingSuccess = req.query['onboarding-success']
  const { id } = req.params
  const { email, frequency } = req.body
  try {
    const [user] = await db('users').where({ id })
    if (!user) {
      return res.status(404).json({
        error: 'Could not find user with the provided id!',
      })
    }
    await db('users')
      .where({ id })
      .update({ ...user, email, frequency })
    if (!!onboardingSuccess) {
      const data = await db
        .table('things')
        .where({
          user_id: user.id,
          surfaced: false,
        })
        .whereNotNull('title')
        .limit(5)
      sendWelcomeEmail(user.email, data)
    }
    res.status(204).end()
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while processing your request.',
    })
  }
})

router.delete('/:id', async (req, res) => {})

module.exports = router
