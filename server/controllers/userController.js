var userModel = require('../models/userModel.js');
var jwt = require('jwt-simple');

module.exports = {
  getUsersInHouse: function (req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.houseId];
    console.log('GET USERS IN HOUSE PARAMS:', params);
    userModel.getUsersInHouse(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        console.log('RESULTS', results); 
        res.json(results);
      }
    });
  },

  findUserByVenmoId: function (req, res) {
    var params = [req.params.venmoId];
    userModel.findUserByVenmoId(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  },
  postUser: function (req, res) {
    var name = req.body.name
    var venmoName = req.body.venmoName;
    var username = req.body.username;
    var email = req.body.email;
    var provider = req.body.provider;
    var venmo = req.body.venmo;
    var balance = parseFloat(req.body.balance);
    var venmoid = req.body.venmoid;
    var params = [name, venmoName, username, email, provider, venmo, balance, venmoid];
    userModel.postUser(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results.insertId);
      }
    })
  },
  putUser: function (req, res) {
    var params = [req.body.balance, req.body.venmo, req.body.venmoid];
    userModel.putUser(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  },
  getHouseOfUser: function(req, res) {
    var params = [req.params.username];
    userModel.getHouseOfUser(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  }
}
