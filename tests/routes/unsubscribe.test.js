const request = require('supertest')
const server = require('../../app')
const db = require('../../database/config')
const utils = require('../../utils')
const { generateHash } = utils

describe('Unsubscribe Endpoint(s)', () => {
  beforeEach(async () => {
    await db.raw('TRUNCATE things, users RESTART IDENTITY CASCADE')
    await db.seed.run()
  })

  test('should return an error if missing either email or hash', async () => {
    const mockData = {
      email: 'test@example.com',
    }

    const res = await request(server)
      .get('/api/v1/unsubscribe')
      .query(mockData)
    const [user] = await db('users').where({ email: mockData.email })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
    expect(user).not.toHaveProperty('frequency', 'unsubscribe')
  })

  test('should change frequency for matching email + hash combo', async () => {
    const mockData = {
      email: 'test@example.com',
      hash: generateHash('test@example.com'),
    }

    const res = await request(server)
      .get('/api/v1/unsubscribe')
      .query(mockData)
    const [user] = await db('users').where({ email: mockData.email })

    expect(res.status).toBe(200)
    expect(res.text).toContain('Thanks for trying Unearth')
    expect(user).toHaveProperty('frequency', 'unsubscribe')
  })

  test('should not change frequency for mismatched email + hash combo', async () => {
    const mockData = {
      email: 'test@example.com',
      hash: generateHash('wrongemail@example.com'),
    }

    const res = await request(server)
      .get('/api/v1/unsubscribe')
      .query(mockData)
    const [user] = await db('users').where({ email: mockData.email })

    expect(res.status).toBe(400)
    expect(res.text).toContain(
      'looks like something is wrong with your unsubscribe link',
    )
    expect(user).toHaveProperty('frequency', 'weekly')
  })
})
