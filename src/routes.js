const express = require('express');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const AdvertisementsController = require('./controllers/AdvertisementController');
const UserProfileController = require('./controllers/UserProfileController');
const AdsUserProfileController = require('./controllers/AdsUserProfileController');

const routes = express.Router();

routes.post('/sessions',SessionController.create);

routes.post('/users/new', UserController.create);

routes.get('/users/profile/:id', UserProfileController.index);
routes.put('/users/profile/edit', UserProfileController.update)

routes.get('/users/profile/announcements/:user_id', AdsUserProfileController.index);
routes.post('/users/profile/announcements/new', AdsUserProfileController.create)
routes.delete('/users/profile/announcements/:id', AdsUserProfileController.delete)
routes.put('/announcements/edit/:id', AdsUserProfileController.update)

routes.get('/users', UserController.index);

routes.get('/announcements', AdvertisementsController.index)



module.exports = routes;