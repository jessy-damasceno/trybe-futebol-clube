import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { Response } from 'superagent';

import {
  userMock, validLogin, 
} from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('É possível fazer login com os dados corretos, retornando um token', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(validLogin);

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
});