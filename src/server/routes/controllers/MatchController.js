'use strict';

module.exports = function(MatchRepository) {

  function remove(req, res) {
    matchHelper.remove(req.params.id, function(err, match) {
      if (!err) {
        match.remove();
        res.status(200)
        res.end();
      }
    });
  }

  return {
    findAll: function(req, res) {
      MatchRepository.find().done(function(err, matchs) {
        if (err) {
          res.send(400);
        } else {
          res.send(matchs);
        }
      });
    },

    findByName: function(req, res) {
      var name = req.param('name');
      MatchRepository.findByName(name).done(function(err, matchs) {
        if (err) {
          res.send(400);
        } else {
          res.send(matchs);
        }
      });
    },

    update: function(req, res) {
      MatchRepository.findOneById(req.param('id')).exec(function(err, match) {
        res.view({
          match: match
        });
      });
    },

    updateSave: function(req, res) {
      var match = req.params.all();
      // save match data
      res.redirect('/match/saved');
    }
  };
};
