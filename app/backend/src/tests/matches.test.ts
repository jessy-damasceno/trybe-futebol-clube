import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { Response } from 'superagent';

import {
  allMatchesMock,
  matchesInProress,
  matchesNotInProgress,
  createdMatch,
  correctBodyToCreateMatch,
} from './mocks/matches.mock';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';
import { userMock } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /matches', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(Match, "findAll").resolves(allMatchesMock as any[]);
    sinon.stub(Match, "create").resolves(createdMatch as any);
    sinon.stub(jwt, "verify").resolves(userMock as User);
    sinon.stub(User, "findOne").resolves(userMock as User);
  })

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Match.create as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Retorna todas as partidas na rota /matches', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(allMatchesMock);
  });

  it('Retorna todas as partidas em progresso na rota /matches?inProgress=true', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(matchesInProress);
  });

  it('Retorna todas as partidas finalizadas na rota /matches?inProgress=false', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(matchesNotInProgress);
  });

  it('Cria uma nova partida caso preenchido o corpo da requisição corretamente em POST /matches', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .send(correctBodyToCreateMatch);

    expect(chaiHttpResponse.status).to.be.eq(201);
    expect(chaiHttpResponse.body).to.be.deep.eq(createdMatch);
  });

  it('Não cria uma nova partida caso o corpo da requisição não seja preenchido corretamente em POST /matches', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .send(correctBodyToCreateMatch);

    expect(chaiHttpResponse.status).to.be.eq(201);
    expect(chaiHttpResponse.body).to.be.deep.eq(createdMatch);
  });
});