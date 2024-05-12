const request = require('supertest')
const { connect } = require('./database')
const app = require('../../index');
const BlogModel = require('../models/blogModel');
const UserModel = require('../models/userModel');
const { getIdFromToken } = require('../../utils/utils')



describe('Blog Route', () => {
    let conn;
    let token;
    let userId;
    let createdArticle

    beforeAll(async () => {
        conn = await connect()

        await UserModel.create({ 
            email: 'tobi@gmail.com',
             password: '123456',
             lastname: 'tobi',
             firstname: 'test2'
            });

        const loginResponse = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'tobi@gmail.com', 
            password: '123456'
        });

        token = loginResponse.body.token;
        userId = getIdFromToken(token)
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should return orders', async () => {
        // create blog in our db
        await BlogModel.create({
            title:'test1',
            description: 'dfghnjkml,mknjbhgfccgbhjnkl.,kmjnbhgcfxdvfbhnjk',
            tags: "test1",
            body: "sdfghcdijocdfldvljjvdkjvdvdkdkfjdfhcjxccjxdfufuefiuefdfkdfdogjk",
            author: userId,
            state: 'published',
            read_count: 1,
            timestamp:Date.now(),
            reading_time: 2          
        })
        await BlogModel.create({
            title:'test2',
            description: 'dfghnjkmlcvbnm,,mknjbhgfccgbhjnkl.,kmjnbhgcfxdvfbhnjk',
            tags: "test2",
            body: "sdfghsdfghjklcdijocdfldvcvbnljjvdkjvdvdkdkfjdfhcjxccjxdfufuefiuefdfkdfdogjk",
            author: userId,
            state: 'published',
            read_count: 2,
            timestamp:Date.now(),
            reading_time: 4
          
        })
        const response = await request(app)
        .post('/blog')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blog')
        expect(response.body).toHaveProperty('status')
    })
})