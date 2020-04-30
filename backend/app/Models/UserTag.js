'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const FriwordLike = use('App/Models/FriwordLike');

class UserTag extends Model {
    user() {
        return this.hasOne('App/Models/User');
    }

    tag() {
        return this.hasOne('App/Models/Tag');
    }
}

module.exports = UserTag
