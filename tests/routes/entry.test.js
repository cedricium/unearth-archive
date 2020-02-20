const request = require('supertest')
const server = require('../../app')

describe('Index/Entry Endpoint', () => {
  test('should return a simple welcome message', async () => {
    const res = await request(server).get('/')
    expect(res.status).toBe(200)
    expect(res.text).toMatch('Welcome!')
  })
})
