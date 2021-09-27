const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const { describe, it } = require('mocha');
const { reviews } = require('../controller');
const server = require('../database/index.js');
const app = require('../app.js')


const generateRandomProductId = function () {
  return Math.floor(Math.random() * (1000011));
}

chai.use(chaiHttp);
describe('master', () => {
  describe('should be able to fetch reviews for product 47421', () => {
    it('should return the correct reviews information', (done) => {
      chai.request(app)
        .get('/master')
        .query({
              sort: 'relevance',
              count: 100,
              product_id: 47421
            })
        .end((err, response) => {     
          expect(response.body.length).to.equal(2);
          expect(response.body[0].length).to.be.greaterThanOrEqual(3);
          expect(response.body[0][0].review_id).to.equal(273025);
          expect(response.body[0][0].reviewer_name).to.equal('Presley65');
          let keys = Object.keys(response.body[1])     
            expect(keys.length).to.equal(4);
            expect(response.body[1].ratings).to.exist;
            expect(response.body[1].recommended).to.exist;
            expect(response.body[1].characteristics).to.exist;
          done();
        });
    });
  });
});

xdescribe('reviews', () => {
    describe('should be able to fetch reviews for product 47421', () => {
      it('should return the correct reviews information', (done) => {
        chai.request(app)
          .get('/reviews')
          .query({
                sort: 'relevance',
                count: 100,
                product_id: 47421
              })
          .end((err, response) => {     
            expect(response.body.length).to.be.greaterThanOrEqual(3);
            expect(response.body[0].id).to.equal(273025);
            expect(response.body[0].reviewer_name).to.equal('Presley65');
            done();
          });
      });
    });
});

xdescribe('meta', () => {
    describe('should be able to fetch meta results for product 47421', () => {
      it('should return the correct meta information', (done) => {
        chai.request(app)
          .get('/meta')
          .query({
                product_id: 47421
              })
          .end((err, response) => {
              let keys = Object.keys(response.body)     
            expect(keys.length).to.equal(4);
            expect(response.body.ratings).to.exist;
            expect(response.body.recommended).to.exist;
            expect(response.body.characteristics).to.exist;

            // expect(response.body[0].reviewer_name).to.equal('Presley65');
            done();
          });
      });
    });
});

describe('help', () => {
    describe('should be able to put help', () => {
      it('should return 201 header', (done) => {
        chai.request(app)
          .put('/helpful')
          .send({
                review_id: 273025
              })
          .end((err, response) => {
            expect(response.status).to.equal(201);
            done();
          });
      });
    });
});

describe('reported', () => {
    describe('should be able to put a reported request', () => {
      it('should return a 201 header', (done) => {
        chai.request(app)
          .put('/report')
          .send({
                review_id: 273025
              })
          .end((err, response) => {   
            expect(response.status).to.equal(201);
            done();
          });
      });
    });
});