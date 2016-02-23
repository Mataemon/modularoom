'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var furnitureCtrlStub = {
  index: 'furnitureCtrl.index',
  show: 'furnitureCtrl.show',
  create: 'furnitureCtrl.create',
  update: 'furnitureCtrl.update',
  destroy: 'furnitureCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var furnitureIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './furniture.controller': furnitureCtrlStub
});

describe('Furniture API Router:', function() {

  it('should return an express router instance', function() {
    furnitureIndex.should.equal(routerStub);
  });

  describe('GET /api/furnitures', function() {

    it('should route to furniture.controller.index', function() {
      routerStub.get
        .withArgs('/', 'furnitureCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/furnitures/:id', function() {

    it('should route to furniture.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'furnitureCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/furnitures', function() {

    it('should route to furniture.controller.create', function() {
      routerStub.post
        .withArgs('/', 'furnitureCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/furnitures/:id', function() {

    it('should route to furniture.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'furnitureCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/furnitures/:id', function() {

    it('should route to furniture.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'furnitureCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/furnitures/:id', function() {

    it('should route to furniture.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'furnitureCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
