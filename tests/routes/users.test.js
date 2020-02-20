const request = require('supertest')
const server = require('../../app')
const db = require('../../database/config')

console.log(
  `USERS.TEST.JS\npostgres://postgres:postgres@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/unearth-test\n`,
)

describe('User Endpoint(s)', () => {
  beforeEach(async () => {
    await db.raw('TRUNCATE things, users RESTART IDENTITY CASCADE')
    await db.seed.run()
  })

  test('should get a user with matching id', async () => {
    const testUserId = 'jk23d'

    const res = await request(server).get(`/api/v1/users/${testUserId}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id', testUserId)
    expect(res.body).toHaveProperty('username', 'test_user')
    expect(res.body).toHaveProperty('email', 'test@example.com')
  })

  test('should return a 404 if user not found', async () => {
    const testUserId = 'xxxxx'

    const res = await request(server).get(`/api/v1/users/${testUserId}`)

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty(
      'error',
      'Could not find user with the provided id!',
    )
  })

  test('should create a new user', async () => {
    const newUser = {
      id: 'abcde',
      username: 'test_user_2',
      email: 'testuser2@example.com',
      frequency: 'weekly',
      has_synced_with_reddit: false,
      sync_status: 'not-started',
    }

    const res = await request(server)
      .post('/api/v1/users')
      .send(newUser)
    const [newUserRecord] = await db('users').where({ id: newUser.id })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id', newUserRecord.id)
    expect(res.body).toHaveProperty('username', newUserRecord.username)
  })

  test('should update an existing user', async () => {
    const userUpdates = {
      email: 'testing@test.com',
      frequency: 'daily',
    }

    const userId = 'jk23d'
    const res = await request(server)
      .patch(`/api/v1/users/${userId}`)
      .send(userUpdates)
    const [updatedUserRecord] = await db('users').where({ id: userId })

    expect(res.status).toBe(204)
    expect(res.body).toEqual({})
    expect(updatedUserRecord).toHaveProperty('email', userUpdates.email)
    expect(updatedUserRecord).toHaveProperty('frequency', userUpdates.frequency)
  })

  test('should delete an existing user', async () => {
    const userId = 'jk23d'

    const res = await request(server).delete(`/api/v1/users/${userId}`)
    const [emptyUserRecord] = await db('users').where({ id: userId })

    expect(res.status).toBe(204)
    expect(emptyUserRecord).toBeFalsy()
  })

  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    db.destroy()
    done()
  })
})
