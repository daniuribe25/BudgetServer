var express  = require("express");

var userCtrl = require('../controllers/userController');
var routerUser = express.Router();

routerUser.route('/findAllUsers')
    .get(userCtrl.findAllUsers);

routerUser.route('/saveUser')
    .post(userCtrl.saveUser);

routerUser.route('/findUser')
    .post(userCtrl.findUser);

module.exports = routerUser;