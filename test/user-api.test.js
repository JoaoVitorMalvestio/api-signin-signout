const Mocks = require('./__mocks__')

const server = require('../src/app')
const supertest = require('supertest')
const requestWithSupertest = supertest(server)

const mongoose = require('../src/repositories/index')
const UserRepository = require('../src/repositories/User')
const clock = require('../src/utils/clock')

describe('user-api', () => {
  afterEach(async () => {
    await UserRepository.deleteMany({})
  })

  beforeAll(async () => {
    await UserRepository.deleteMany({})
  })

  afterAll(done => {
    mongoose.connection.close()
    done()
  })

  it('POST /signup happyDay', async () => {
    const res = await requestWithSupertest.post('/user/signup').send(Mocks.signup)

    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('dataAtualizacao')
    expect(res.body).toHaveProperty('dataCriacao')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('telefones')
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('ultimoLogin')
    expect(res.body).toHaveProperty('nome')
  })

  it('POST /signup with existent email, should be error', async () => {
    await requestWithSupertest.post('/user/signup').send(Mocks.signup)
    const res = await requestWithSupertest.post('/user/signup').send(Mocks.signup)

    expect(res.status).toEqual(412)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body).toEqual(Mocks.emailAlreadyExistResponse)
  })

  it('PUT /signin happyDay', async () => {
    await requestWithSupertest.post('/user/signup').send(Mocks.signup)
    const res = await requestWithSupertest.put('/user/signin').send(Mocks.signin)

    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('nome')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('telefones')
    expect(res.body).toHaveProperty('dataCriacao')
    expect(res.body).toHaveProperty('dataAtualizacao')
    expect(res.body).toHaveProperty('ultimoLogin')
    expect(res.body).toHaveProperty('token')
  })

  it('PUT /signin user not exist, should be error', async () => {
    const res = await requestWithSupertest.put('/user/signin').send(Mocks.signin)

    expect(res.status).toEqual(401)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body).toEqual(Mocks.wrongEmailOrPassword)
  })

  it('PUT /signin user wrong password, should be error', async () => {
    await requestWithSupertest.post('/user/signup').send(Mocks.signup)
    const res = await requestWithSupertest.put('/user/signin').send(Mocks.signinWrongPassword)

    expect(res.status).toEqual(401)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body).toEqual(Mocks.wrongEmailOrPassword)
  })

  it('GET /user happyDay', async () => {
    const user = await requestWithSupertest.post('/user/signup').send(Mocks.signup)
    const res = await requestWithSupertest.get('/user').query({ id: user.body.id }).set('authorization', 'Bearer '.concat(user.body.token)).send()

    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('nome')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('telefones')
    expect(res.body).toHaveProperty('dataCriacao')
    expect(res.body).toHaveProperty('dataAtualizacao')
    expect(res.body).toHaveProperty('ultimoLogin')
  })

  it('GET /user without token', async () => {
    const user = await requestWithSupertest.post('/user/signup').send(Mocks.signup)
    const res = await requestWithSupertest.get('/user').query({ id: user.body.id }).send()

    expect(res.status).toEqual(401)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body).toEqual(Mocks.unauthorized)
  })

  it('GET /user wrong token, should be error', async () => {
    const user = await requestWithSupertest.post('/user/signup').send(Mocks.signup)
    const res = await requestWithSupertest.get('/user').query({ id: user.body.id }).set('authorization', 'Bearer '.concat('Wrong token')).send()

    expect(res.status).toEqual(401)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body).toEqual(Mocks.unauthorized)
  })

  it('GET /user last login more than 30 minutes, should be error', async () => {
    jest.spyOn(clock, 'today').mockImplementation(() => '2021-11-17T14:30:00-03:00')

    const user = await requestWithSupertest.post('/user/signup').send(Mocks.signup)

    jest.spyOn(clock, 'today').mockImplementation(() => '2021-11-17T15:30:00-03:00')

    const res = await requestWithSupertest.get('/user').query({ id: user.body.id }).set('authorization', 'Bearer '.concat(user.body.token)).send()

    expect(res.status).toEqual(401)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body).toEqual(Mocks.unauthorized)
  })

  it('GET a inexistent url, should be error', async () => {
    const res = await requestWithSupertest.get('/teste/not/found')

    expect(res.status).toEqual(404)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body).toEqual(Mocks.notFoundResponse)
  })
})
