// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

describe('[POST] /auth/register', () => {
 test('responds with the new user', async () => {
   const res = await request(server)
   .post('/api/auth/register')
   .send({ username: 'mac', password: "moon"})
   expect(res.body).toMatchObject({ id: 1, username: "mac"})
 }, 600)
 test('responds with a 401 on missing username', async () => {
   const res = await request(server)
   .post('/api/auth/register')
   .send({ name : ""})
   expect(res.status).toBe(401)
 }, 600)
})

describe('[POST] /auth/login', () => {
  test('responds with welcome message', async () => {
    const res = await request(server)
    .post('/api/auth/login')
    .send({ username: 'mac', password: "moon"})
    expect(res.body).toMatchObject({ message: "welcome mac"})
  }, 600)
  test('responds with a 401 on missing username or password', async () => {
    const res = await request(server)
    .post('/api/auth/login')
    .send({ name : ""})
    expect(res.status).toBe(401)
  }, 600)
 })

 describe('[GET]] /jokes', () => {
  test('responds with token error', async () => {
    const res = await request(server)
    .get('/api/jokes')
    .send({ username: 'mike', password: "hff"})
    expect(res.body).toMatchObject({ message : "token required"})
  }, 600)
 })

