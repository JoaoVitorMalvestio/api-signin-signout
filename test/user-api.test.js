const Mocks = require('./__mocks__')

const server = require('../src/app')
const supertest = require('supertest')
const requestWithSupertest = supertest(server)

describe('user-api', () => {
  let UserRepository

  beforeEach(() => {
    jest.restoreAllMocks()
    UserRepository = require('../src/repositories/User')
  })

  it('POST /signup happyDay', async () => {
    jest.spyOn(UserRepository, 'findOne').mockReturnValue(null)
    jest.spyOn(UserRepository, 'select').mockReturnValue(Mocks.createUser)
    jest.spyOn(UserRepository, 'create').mockReturnValue(null)

    const res = await requestWithSupertest.post('/user/signup').send(Mocks.signup)

    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('users')
  })

  it('GET a inexistent url, should be error', async () => {
    const res = await requestWithSupertest.get('/teste/not/found')

    expect(res.status).toEqual(404)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body).toEqual(Mocks.notFoundResponse)
  })
})
