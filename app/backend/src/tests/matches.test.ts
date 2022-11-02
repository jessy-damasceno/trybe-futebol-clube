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
  incorrectBodyToCreateMatch1,
  incorrectBodyToCreateMatch2,
  incorrectBodyToCreateMatch3,
  equalTeamsBody,
  invalidTeamsBody,
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
    sinon.stub(Match, "findByPk").resolves(allMatchesMock[0] as any);
    sinon.stub(Match, "create").resolves(createdMatch as any);
    sinon.stub(jwt, "verify").resolves(userMock as User);
    sinon.stub(User, "findOne").resolves(userMock as User);
  })

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Match.findByPk as sinon.SinonStub).restore();
    (Match.create as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Retorna a partida na rota /matches/:id', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches/1');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(allMatchesMock[0]);
  });

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

  it('Não cria uma nova partida caso o corpo da requisição não seja preenchido corretamente em POST /matches - case 1', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .send(incorrectBodyToCreateMatch1);

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  it('Não cria uma nova partida caso o corpo da requisição não seja preenchido corretamente em POST /matches - case 2', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .send(incorrectBodyToCreateMatch2);

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  it('Não cria uma nova partida caso o corpo da requisição não seja preenchido corretamente em POST /matches - case 3', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .send(incorrectBodyToCreateMatch3);

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  it('Não cria uma nova partida com dois times iguais', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .send(equalTeamsBody);

    expect(chaiHttpResponse.status).to.be.eq(422);
    expect(chaiHttpResponse.body.message).to.be.eq('It is not possible to create a match with two equal teams');
  });

  it('Não cria uma nova partida com um ou dois times que não existem', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .send(invalidTeamsBody);

    expect(chaiHttpResponse.status).to.be.eq(404);
    expect(chaiHttpResponse.body.message).to.be.eq('There is no team with such id!');
  });

  it('Finaliza uma partida corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/1/finish')
       .send(correctBodyToCreateMatch);

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body.message).to.be.eq('Finished');
  });

  it('Atualiza uma partida corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/1/')
       .send(correctBodyToCreateMatch);

    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});