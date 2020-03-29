'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('welcome');
Route.group(() => {

    Route.post('auth/anonymous', 'AuthController.signInAnonymously');

    Route.get('friwords', 'FriwordController.getFriwords');
    Route.get('friwords/updates_available/:lastId', 'FriwordController.hasUpdatesAvailable'); // Check if there is updates available to pull
    Route.get('friwords/:id', 'FriwordController.getFriwordById');
    Route.post('friwords/:id/like', 'FriwordController.likeById');
    Route.post('friwords/:id/dislike', 'FriwordController.dislikeById');

    Route.post('friwords', 'FriwordController.postFriword');
    Route.post('friwords/:id/comments', 'FriwordController.postFriwordComment');
}).prefix('api/v1');