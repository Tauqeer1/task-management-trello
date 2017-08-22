const _ =require('lodash');
const Column = require('../model/column');
const Card = require('../model/card');
let log = require('../../helper/dev-logger');

module.exports = function(app) {

  app.post('/column', (req, res) => {
    Column.create(req.body, (err, column) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: column, error: null});
    });
  });

  app.get('/column', (req, res) => {
    Column.find((err, columns) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: columns, error: null});
    });
  });

  app.get('/column/:id', (req, res) => {
    Column.findById(req.params.id, (err, column) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: column, error: null});
    });
  });

  app.get('/column/:id/cards', (req, res) => {
    Column.findById(req.params.id, (err, column) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      if(column) {
        Card.find({columnId: req.params.id}).sort({order: 1}).exec((err, cards) => {
          if(err) {
            return res.json({success: false, data: null, error: err});
          }
          return res.json({success: true, data: cards, error: null});
        });
      }
      else {
        return res.json({success: false, data: null, error: 'Column not found'});
      }
    });
  });

  app.put('/column/:id', (req, res) => {
    Column.findById(req.params.id, (err, column) => {
      if (err) {
        return res.json({success: false, data: null, error: err});
      }
      if (column) {
        _.merge(column, req.body);
        column.save(function(err) {
          if (err) {
            return res.json({success: false, data: null, error: err});
          }
          return res.json({success: true, data: 'column updated successfully', error: null});
        });
      } else {
        return res.json({success: false, data: null, error: 'Column not found'});
      }
    });
  });

  app.delete('/column/:id', (req, res) => {
    Column.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: 'Column Deleted Successfully', error: null});
    });
  });

};
