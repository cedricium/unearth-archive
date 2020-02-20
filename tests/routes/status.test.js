const request = require('supertest')
const server = require('../../app')

describe('Health Check Endpoint(s)', () => {
  test('should return a successful response', async () => {
    const res = await request(server).get('/api/v1/status')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('status', 'success')
  })
})
