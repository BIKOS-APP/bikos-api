const express = require('express');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const AdvertisementsController = require('./controllers/AdvertisementController');
const UserProfileController = require('./controllers/UserProfileController');
const AdsUserProfile = require('./controllers/AdsUserProfile');

const routes = express.Router();

routes.post('/sessions',SessionController.create);

routes.post('/users/new', UserController.create);
routes.get('/users', UserController.index);
routes.get('/users/profile/:id', UserProfileController.index);

routes.post('/announcements/new', AdvertisementsController.create)
routes.get('/announcements', AdvertisementsController.index)
routes.get('/announcements', AdvertisementsController.index)
routes.delete('/announcements/:id', AdvertisementsController.delete)
routes.put('/announcements/edit/:id', AdvertisementsController.update)

routes.get('/users/profile/announcements/:user_id', AdsUserProfile.index);

module.exports = routes;