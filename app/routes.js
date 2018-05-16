const express = require('express');
const routes = express.Router();

// Middlawres
const utilsMiddleware = require('./middlewares/utils');
const userMiddleware = require('./middlewares/user');
const guestMiddleware = require('./middlewares/guest');

// Controllers
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');

routes.use(utilsMiddleware);

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/*
  Rotas para autenticação
*/
routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

routes.get('/signout', authController.signout);

routes.use('/app', userMiddleware);
/* Dashboard */
routes.get('/app/dashboard', dashboardController.index);

/* Project */
routes.get('/app/project/new', projectController.new);
routes.post('/app/project/store', projectController.store);

module.exports = routes;
