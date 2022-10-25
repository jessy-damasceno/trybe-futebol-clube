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
} from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /matches', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(Match, "findAll").resolves(allMatchesMock as any[]);
  })

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
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
});