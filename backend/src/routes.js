const express = require('express');
const ongControler = require('./controllers/ongController.js');
const incidentController = require('./controllers/incidentController.js');
const profileController = require('./controllers/profileController.js');
const sessionController = require('./controllers/sessionController.js');
const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongControler.index);
routes.post('/ongs', ongControler.create);

routes.get('/profile', profileController.index)

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;