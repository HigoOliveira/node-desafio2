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
const sectionController = require('./controllers/sectionController');

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
routes.post('/app/project/store', projectController.store);
routes.get('/app/project/:projectId', projectController.index);
routes.delete('/app/project/:projectId', projectController.destroy);

/* Section */
routes.post('/app/project/:projectId/section/store', sectionController.store);
routes.get('/app/project/:projectId/section/:sectionId', projectController.index);
routes.put('/app/project/:projectId/section/:sectionId', sectionController.update);
routes.delete('/app/project/:projectId/section/:sectionId', sectionController.destroy);

routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
