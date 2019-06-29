const AWS = require('aws-sdk')
const { getFromSSM } = require('./ssm')

describe('getFromSSM', () => {
  beforeEach(() => {
    const ssmGetParameterPromise = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        Parameter: {
          Name: 'NAME',
          Type: 'SecureString',
          Value: 'VALUE',
          Version: 1,
          LastModifiedDate: 1546551668.495,
          ARN: 'arn:aws:ssm:ap-southeast-2:123:NAME'
        }
      })
    })

    AWS.SSM = jest.fn().mockImplementation(() => ({
      getParameter: ssmGetParameterPromise
    }))
  })

  test('it should decrypt string from ssm', async () => {
    expect.assertions(1)
    await expect(getFromSSM('NAME')).resolves.toBe('VALUE')
  })
})
