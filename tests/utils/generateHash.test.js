const { generateHash } = require('../../utils')

describe('generateHash Helper Function', () => {
  test('should return a string', () => {
    const res = generateHash('test string')
    expect(typeof res).toBe('string')
  })

  test('should mask input string in a Base64-encoded SHA-256 hash', () => {
    const inputString = 'this is a test'
    const res = generateHash(inputString)
    expect(res).not.toBe(inputString)
  })

  test('should hash empty input string', () => {
    const emptyString = ''
    const res = generateHash(emptyString)
    expect(res).not.toHaveLength(0)
  })

  test('should use base64url encoding to generate URL-safe hashes', () => {
    /**
     * Standard base64 includes the following characters: + / =
     *
     * Using any of those chars in a URL can be costly as they could be
     * interpreted incorrectly and thus cause functionality dependent upon the
     * `generateHash` function to fail (as was the case in a user-reported
     * issue). Thus, we want to use base64url encoding[0] when returning the hash
     * which maps the problem chars to URL-safe characters for us.
     *
     * The email used in this test is a good example: after hashing and standard
     * base64 is applied, the encoded hash is: 8nWX/aFHt1pQkKqNT+5qrBIEJWzmuArWdlPOb3shBBw=
     * Note the problem chars as outlined:     ----^------------^-------------------------^
     *
     * References:
     *  [0]: https://en.wikipedia.org/wiki/Base64#URL_applications
     */
    const email = 'test_user@gmail.com'
    const res = generateHash(email)
    expect(res).not.toMatch(/[\/=+]/)
  })
})
