/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Grid from '../api/grid/grid.model';

Grid.find({}).removeAsync()
  .then(() => {
    Grid.create({
      "name" : "Formation",
    "info" : "",
    "image" : "formation.png",
    "furnitures" : [ 
        {
            "index" : 0,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 1,
            "title" : "Vide",
            "type" : "desk"
        }, 
        {
            "index" : 2,
            "title" : "Vide",
            "type" : "desk"
        }, 
        {
            "index" : 3,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 4,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 5,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 6,
            "title" : "Vide",
            "type" : "chair"
        }, 
        {
            "index" : 7,
            "title" : "Vide",
            "type" : "chair"
        }, 
        {
            "index" : 8,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 9,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 10,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 11,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 12,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 13,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 14,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 15,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 16,
            "title" : "Vide",
            "type" : "desk"
        }, 
        {
            "index" : 17,
            "title" : "Vide",
            "type" : "desk"
        }, 
        {
            "index" : 18,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 19,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 20,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 21,
            "title" : "Vide",
            "type" : "chair"
        }, 
        {
            "index" : 22,
            "title" : "Vide",
            "type" : "chair"
        }, 
        {
            "index" : 23,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 24,
            "title" : "Vide",
            "type" : "empty"
        }
    ]
    }, {
      "name" : "Réunion",
    "info" : "",
    "image" : "reunion.png",
    "furnitures" : [ 
        {
            "index" : 0,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 1,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 2,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 3,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 4,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 5,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 6,
            "title" : "Vide",
            "type" : "chair"
        }, 
        {
            "index" : 7,
            "title" : "Vide",
            "type" : "chair"
        }, 
        {
            "index" : 8,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 9,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 10,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 11,
            "title" : "Vide",
            "type" : "desk"
        }, 
        {
            "index" : 12,
            "title" : "Vide",
            "type" : "desk"
        }, 
        {
            "index" : 13,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 14,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 15,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 16,
            "title" : "Vide",
            "type" : "desk"
        }, 
        {
            "index" : 17,
            "title" : "Vide",
            "type" : "desk"
        }, 
        {
            "index" : 18,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 19,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 20,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 21,
            "title" : "Vide",
            "type" : "chair"
        }, 
        {
            "index" : 22,
            "title" : "Vide",
            "type" : "chair"
        }, 
        {
            "index" : 23,
            "title" : "Vide",
            "type" : "empty"
        }, 
        {
            "index" : 24,
            "title" : "Vide",
            "type" : "empty"
        }
    ]
    });
  });

