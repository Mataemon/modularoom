'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var gridCtrlStub = {
  index: 'gridCtrl.index',
  show: 'gridCtrl.show',
  create: 'gridCtrl.create',
  update: 'gridCtrl.update',
  destroy: 'gridCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var gridIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './grid.controller': gridCtrlStub
});

describe('Grid API Router:', function() {

  it('should return an express router instance', function() {
    gridIndex.should.equal(routerStub);
  });

  describe('GET /api/grids', function() {

    it('should route to grid.controller.index', function() {
      routerStub.get
        .withArgs('/', 'gridCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/grids/:id', function() {

    it('should route to grid.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'gridCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/grids', function() {

    it('should route to grid.controller.create', function() {
      routerStub.post
        .withArgs('/', 'gridCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/grids/:id', function() {

    it('should route to grid.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'gridCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/grids/:id', function() {

    it('should route to grid.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'gridCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/grids/:id', function() {

    it('should route to grid.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'gridCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
