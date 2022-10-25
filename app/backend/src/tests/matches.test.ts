import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { Response } from 'superagent';

import {
  allMatchesMock,
} from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Teste /matches', () => {
  let chaiHttpResponse: Response;

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Retorna todas as partidas na rota /matches', async () => {
    sinon.stub(Match, "findAll").resolves(allMatchesMock as any[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/matches');

    console.log(chaiHttpResponse.body);
    
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(allMatchesMock);
  });

  // it('Retorna um time pelo id na rota /teams/:id', async () => {
  //   sinon.stub(Team, "findByPk").resolves(allTeamsMock[0] as Team);

  //   chaiHttpResponse = await chai
  //      .request(app)
  //      .get('/teams/1');

  //   console.log(chaiHttpResponse.body);
    
  //   expect(chaiHttpResponse.status).to.be.eq(200);
  //   expect(chaiHttpResponse.body).to.be.deep.eq(allTeamsMock[0]);
  // });
});