const request = require('supertest')
const server = require('../../app')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

const mockAxios = new MockAdapter(axios)

describe('Reddit Proxy Endpoint(s)', () => {
  afterEach(() => {
    mockAxios.reset()
  })

  test('should return the access and refresh tokens', async () => {
    const data = {
      grant_type: 'authorization_code',
      code: 'some%20code%20from%20reddit',
      redirect_uri: `http://localhost:8000/app/auth/reddit`,
    }

    const mockResponse = {
      access_token: 'test_access_token',
      token_type: 'bearer',
      expires_in: 3600,
      scope: 'a_scope_string',
      refresh_token: 'test_refresh_token',
    }

    mockAxios
      .onPost('https://www.reddit.com/api/v1/access_token')
      .reply(200, mockResponse)

    const res = await request(server)
      .post('/api/v1/reddit/access_token')
      .send(data)

    expect(res.body).toEqual(mockResponse)
  })

  test('should error out if required params are not sent', async () => {
    const data = {
      grant_type: 'authorization_code',
      code: 'some%20code%20from%20reddit',
      // missing redirect_uri
    }

    const res = await request(server)
      .post('/api/v1/reddit/access_token')
      .send(data)

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('error')
  })

  test('should error out if Reddit API returns an error', async () => {
    const data = {
      grant_type: 'authorization_code',
      code: 'some%20code%20from%20reddit',
      redirect_uri: `http://localhost:8000/app/auth/reddit`,
    }

    mockAxios.onPost('https://www.reddit.com/api/v1/access_token').reply(500)

    const res = await request(server)
      .post('/api/v1/reddit/access_token')
      .send(data)

    expect(res.status).toBe(500)
    expect(res.body).toHaveProperty('error')
  })
})
