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

describe.only('Teste /login', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Retorna todos os times', async () => {
    sinon.stub(Team, "findAll").resolves(allTeamsMock as Team[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    console.log(chaiHttpResponse.body);
    
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(allTeamsMock);
  });
});