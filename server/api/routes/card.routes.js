const _ = require('lodash');
const Card = require('../model/card');
let log = require('../../helper/dev-logger');

module.exports = function(app) {

  app.post('/card', (req, res) => {
    Card.create(req.body, (err, card) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: card, error: null});
    });
  });

  app.get('/card', (req, res) => {
    Card.find((err, cards) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: cards, error: null});
    });
  });

  app.get('/card/:id', (req, res) => {
    Card.findById(req.params.id, (err, card) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: card, error: null});
    });
  });

  app.put('/card/:id', (req, res) => {
    Card.findById(req.params.id, (err, card) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      if(card) {
        _.merge(card, req.body);
        card.save((err) => {
          if(err) {
            return res.json({success: false, data: null, error: err});
          }
          return res.json({success: true, data: 'updated successfully', error: null});
        });
      }
    });
  });

  app.delete('/card/:id', (req, res) => {
    Card.findByIdAndRemove(req.params.id, (err) => {
      if(err) {
        return res.json({success: false, data: null, error: err});
      }
      return res.json({success: true, data: 'Deleted Successfully', error: null});
    });
  });
};
