import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { Response } from 'superagent';

import {
  userMock,
  validLogin,
  invalidLoginEmail,
  invalidLoginPassword,
  emptyEmail,
  emptyPassword,
} from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /login', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('É possível fazer login com os dados corretos, retornando um token', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(validLogin);

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

  it('Retorna mensagem de erro caso e-mail seja inválido', async () => {
    sinon.stub(User, "findOne").resolves(null);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(invalidLoginEmail);

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('Retorna mensagem de erro caso senha seja inválida', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(invalidLoginPassword);

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('Não é possível realizar login sem e-mail ou senha', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(emptyEmail);

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  it('Não é possível realizar login sem e-mail ou senha', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(emptyPassword);

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });
});