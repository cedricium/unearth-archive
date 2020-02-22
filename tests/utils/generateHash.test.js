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
})
