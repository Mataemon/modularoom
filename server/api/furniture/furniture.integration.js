'use strict';

var app = require('../..');
import request from 'supertest';

var newFurniture;

describe('Furniture API:', function() {

  describe('GET /api/furnitures', function() {
    var furnitures;

    beforeEach(function(done) {
      request(app)
        .get('/api/furnitures')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          furnitures = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      furnitures.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/furnitures', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/furnitures')
        .send({
          name: 'New Furniture',
          info: 'This is the brand new furniture!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFurniture = res.body;
          done();
        });
    });

    it('should respond with the newly created furniture', function() {
      newFurniture.name.should.equal('New Furniture');
      newFurniture.info.should.equal('This is the brand new furniture!!!');
    });

  });

  describe('GET /api/furnitures/:id', function() {
    var furniture;

    beforeEach(function(done) {
      request(app)
        .get('/api/furnitures/' + newFurniture._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          furniture = res.body;
          done();
        });
    });

    afterEach(function() {
      furniture = {};
    });

    it('should respond with the requested furniture', function() {
      furniture.name.should.equal('New Furniture');
      furniture.info.should.equal('This is the brand new furniture!!!');
    });

  });

  describe('PUT /api/furnitures/:id', function() {
    var updatedFurniture;

    beforeEach(function(done) {
      request(app)
        .put('/api/furnitures/' + newFurniture._id)
        .send({
          name: 'Updated Furniture',
          info: 'This is the updated furniture!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFurniture = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFurniture = {};
    });

    it('should respond with the updated furniture', function() {
      updatedFurniture.name.should.equal('Updated Furniture');
      updatedFurniture.info.should.equal('This is the updated furniture!!!');
    });

  });

  describe('DELETE /api/furnitures/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/furnitures/' + newFurniture._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when furniture does not exist', function(done) {
      request(app)
        .delete('/api/furnitures/' + newFurniture._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
