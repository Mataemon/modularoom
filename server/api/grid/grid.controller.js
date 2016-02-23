/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/grids              ->  index
 * POST    /api/grids              ->  create
 * GET     /api/grids/:id          ->  show
 * PUT     /api/grids/:id          ->  update
 * DELETE  /api/grids/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Grid from './grid.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Grids
export function index(req, res) {
  Grid.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Grid from the DB
export function show(req, res) {
  Grid.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Grid in the DB
export function create(req, res) {
  Grid.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Grid in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Grid.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Grid from the DB
export function destroy(req, res) {
  Grid.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
