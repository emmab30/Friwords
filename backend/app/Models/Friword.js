'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Friword extends Model {
    comments() {
        return this.hasMany('App/Models/FriwordComment');
    }

    user() {
        return this.hasOne('App/Models/User', 'user_alias', 'alias');
    }
}

module.exports = Friword
