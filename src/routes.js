const express = require('express');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const AdvertisementsController = require('./controllers/AdvertisementController');
const UserProfileController = require('./controllers/UserProfileController');
const AdsUserProfileController = require('./controllers/AdsUserProfileController');
const CandidateController = require('./controllers/CandidateController');
const ProviderController = require('./controllers/ProviderController');

const routes = express.Router();

//valida sessão do usuario
routes.post('/sessions',SessionController.create);

// //cria um novo usuario
routes.post('/users/new', UserController.create);

// //retorna o perfil de um usuario
routes.get('/users/profile/:id', UserProfileController.index);
// //edita os campos do perfil do usuario
routes.put('/users/profile/edit', UserProfileController.update);

// //cria um novo anuncio
routes.post('/users/profile/announcements/new', AdsUserProfileController.create)
// //deleta um anuncio
routes.delete('/users/profile/announcements/:id', AdsUserProfileController.delete)
// //edita um anuncio
routes.put('/users/profile/announcements/edit/:id', AdsUserProfileController.update)
routes.put('/users/profile/announcements/:id/hire/provider/:provider', ProviderController.update)


// //retorna todos anuncios
routes.get('/announcements', AdvertisementsController.index)
//retorna todos anuncios de um usuario
routes.get('/announcements/user/:user_id', AdvertisementsController.findByUserId);
routes.get('/announcements/category/:cat_id', AdvertisementsController.findByCategory);
routes.get('/announcements/searchcity', AdvertisementsController.findByCity);


// //retorna todos usuarios
routes.get('/users', UserController.index);

routes.post('/announcements/:ads_id/candidates/apply', CandidateController.create)
routes.delete('/announcements/:ads_id/candidates/unapply', CandidateController.delete)
routes.get('/announcements/:ads_id/candidates', CandidateController.index)

module.exports = routes;