const express = require('express');
const routes = express.Router();

// Middlawres
const utilsMiddleware = require('./middlewares/utils');

// Controllers
const authController = require('./controllers/authController');

routes.use(utilsMiddleware);

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/*
  Rotas para autenticação
*/
routes.get('/', authController.signin);
routes.get('/signup', authController.signup);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

module.exports = routes;
