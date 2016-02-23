'use strict';

var app = require('../..');
import request from 'supertest';

var newGrid;

describe('Grid API:', function() {

  describe('GET /api/grids', function() {
    var grids;

    beforeEach(function(done) {
      request(app)
        .get('/api/grids')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          grids = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      grids.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/grids', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/grids')
        .send({
          name: 'New Grid',
          info: 'This is the brand new grid!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newGrid = res.body;
          done();
        });
    });

    it('should respond with the newly created grid', function() {
      newGrid.name.should.equal('New Grid');
      newGrid.info.should.equal('This is the brand new grid!!!');
    });

  });

  describe('GET /api/grids/:id', function() {
    var grid;

    beforeEach(function(done) {
      request(app)
        .get('/api/grids/' + newGrid._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          grid = res.body;
          done();
        });
    });

    afterEach(function() {
      grid = {};
    });

    it('should respond with the requested grid', function() {
      grid.name.should.equal('New Grid');
      grid.info.should.equal('This is the brand new grid!!!');
    });

  });

  describe('PUT /api/grids/:id', function() {
    var updatedGrid;

    beforeEach(function(done) {
      request(app)
        .put('/api/grids/' + newGrid._id)
        .send({
          name: 'Updated Grid',
          info: 'This is the updated grid!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGrid = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGrid = {};
    });

    it('should respond with the updated grid', function() {
      updatedGrid.name.should.equal('Updated Grid');
      updatedGrid.info.should.equal('This is the updated grid!!!');
    });

  });

  describe('DELETE /api/grids/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/grids/' + newGrid._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when grid does not exist', function(done) {
      request(app)
        .delete('/api/grids/' + newGrid._id)
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
