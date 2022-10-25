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

describe('Teste /login', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('É possível fazer login com os dados corretos, retornando um token', async () => {
    sinon.stub(Team, "findAll").resolves(allTeamsMock as any);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.an('array').eq(allTeamsMock);
  });
});