'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crudController = require('../../controllers/crudController');

var _crudController2 = _interopRequireDefault(_crudController);

var _middlewares = require('../../middlewares');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crudRouter = _express2.default.Router();

crudRouter.get('/animes', _middlewares.verifyToken, _crudController2.default.GetAnimes);

crudRouter.post('/create-anime', _middlewares.verifyToken, _middlewares.verifyUserInput.crudUserRequestBody, _crudController2.default.CreateAnime);

crudRouter.get('/anime/:id', _middlewares.verifyToken, _crudController2.default.GetAnimeById);

crudRouter.delete('/anime/:id', _middlewares.verifyToken, _crudController2.default.DeleteAnimeById);

crudRouter.patch('/anime/:id', _middlewares.verifyToken, _middlewares.verifyUserInput.crudUserRequestBody, _crudController2.default.UpdateAnimeById);

exports.default = crudRouter;