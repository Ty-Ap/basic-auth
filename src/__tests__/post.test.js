const { app } = require('../server');
const supertest = require('supertest');
const {sequelizeDatabase} = require('../models');
const request = supertest(app);


beforeAll(async () =>{
  await sequelizeDatabase.sync();

});

afterAll(async () =>{
  await sequelizeDatabase.drop();
});

describe('user route', ()=> {
  it ('creates a user', async ()=> {
    const response = await request.post('/user').send({
      username: 'Spiderman',
      password: 'user',
    });
    const responseTwo = await request.post('/user').send({
      username: 'Captain Marvel',
      password: 'user',
    });

    expect(response.body.username).toEqual('Spiderman');
    expect(responseTwo.body.username).toEqual('Captain Marvel');
    expect(response.body.password).toEqual('user');
  });

  it ('assembles all users', async ()=> {
    const response = await request.get('/user');

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].username).toEqual('Spiderman');
    expect(response.body[1].username).toEqual('Captain Marvel');
  });

  it('updates user by id', async () => {
    const response = await request.put('/user/1').send({
      username: 'Anakin',
      password: 'user',
    });
    const responseTwo = await request.get('/user/1');
    expect(response.status).toBe(200);
    expect(responseTwo.body.username).toEqual('Anakin');
  });

  it ('deletes by id', async ()=>{
    const response = await request.delete('/user/1');

    expect(response.status).toEqual(200);

  });
});