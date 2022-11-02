import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import {
  leaderboardResponse,
  leaderboardHome,
  leaderboardAway,
  finishedMatches,
  allTeams,
} from './mocks/leaderboard.mock';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /leaderboard', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(Match, "findAll").resolves(finishedMatches as any[]);
    sinon.stub(Team, "findAll").resolves(allTeams as any[]);
  })

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Retorna corretamente a classificação dos times na rota /leaderboard', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(leaderboardResponse);
  });

  it('Retorna corretamente a classificação dos times na rota /leaderboard/home', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(leaderboardHome);
  });

  it('Retorna corretamente a classificação dos times na rota /leaderboard/away', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(leaderboardAway);
  });
});