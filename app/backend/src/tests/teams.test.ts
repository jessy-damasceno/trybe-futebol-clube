import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { Response } from 'superagent';

import {
  allTeamsMock,
} from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /teams', () => {
  let chaiHttpResponse: Response;

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('Retorna todos os times na rota /teams', async () => {
    sinon.stub(Team, "findAll").resolves(allTeamsMock as Team[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    console.log(chaiHttpResponse.body);
    
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(allTeamsMock);
  });

  it('Retorna um time pelo id na rota /teams/:id', async () => {
    sinon.stub(Team, "findByPk").resolves(allTeamsMock[0] as Team);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1');

    console.log(chaiHttpResponse.body);
    
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(allTeamsMock[0]);
  });
});