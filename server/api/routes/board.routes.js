const _ = require('lodash');
const Board = require('../model/board');
const Card = require('../model/card');
const Column = require('../model/column');

module.exports = (app) => {

  app.post('/board', (req, res) => {
    Board.create(req.body, (err, board) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: board, error: null});
    });
  });
  app.get('/board', (req, res) => {
    Board.find((err, boards) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: boards, error: null});
    });
  });

  app.get('/board/:id', (req, res) => {
    Board.findById(req.params.id, (err, board) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: board, error: null});
    });
  });

};
