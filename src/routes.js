const express = require('express');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const AdvertisementsController = require('./controllers/AdvertisementController');
const UserProfileController = require('./controllers/UserProfileController');
const AdsUserProfileController = require('./controllers/AdsUserProfileController');
const CandidateController = require('./controllers/CandidateController');
const ProviderController = require('./controllers/ProviderController');
const CategoryController = require('./controllers/CategoryController');

const routes = express.Router();


// //retorna o perfil do usuario logado
routes.get('/users/profile', UserProfileController.find);

//retorna o perfil de um usuario especifico
routes.get('/users/:id', UserController.find)

//valida sessão do usuario
routes.post('/sessions',SessionController.create);

// //cria um novo usuario
routes.post('/users/new', UserController.create);

// //edita os campos do perfil do usuario
routes.put('/users/profile/edit', UserProfileController.update);

//busca todos os anuncios do usuario logado
routes.get('/users/profile/announcements', AdsUserProfileController.index)
// //cria um novo anuncio
routes.post('/users/profile/announcements/new', AdsUserProfileController.create)
// //deleta um anuncio
routes.delete('/users/profile/announcements/:id', AdsUserProfileController.delete)
// //edita um anuncio
routes.put('/users/profile/announcements/edit/:id', AdsUserProfileController.update)
//contrata um prestador para um determinado serviço
routes.put('/users/profile/announcements/:id/hire/provider/:provider', ProviderController.update)

// //retorna todos anuncios
routes.get('/announcements', AdvertisementsController.index)
//retorna todos anuncios de um usuario qualquer
routes.get('/announcements/user/:user_id', AdvertisementsController.findByUserId);
//retorna todos anuncios de uma categoria especifica
routes.get('/announcements/category/:cat_id', AdvertisementsController.findByCategory);
//retorna todos anuncios em uma cidade especifica
routes.get('/announcements/searchcity', AdvertisementsController.findByCity);

routes.post('/announcements/:ads_id/candidates/apply', CandidateController.create)
routes.delete('/announcements/:ads_id/candidates/unapply', CandidateController.delete)
routes.get('/announcements/:ads_id/candidates', CandidateController.index)

// //retorna todos usuarios
routes.get('/users', UserController.index);

routes.get('/categories', CategoryController.index);


module.exports = routes;