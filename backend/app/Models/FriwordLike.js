'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FriwordLike extends Model {
    static boot() {
        super.boot();

        this.addHook('afterCreate', 'FriwordLikeHook.afterCreate');
        this.addHook('afterDelete', 'FriwordLikeHook.afterDelete');
    }

    user() {
        return this.hasOne('App/Models/User', 'user_id', 'id');
    }

    friword() {
        return this.hasOne('App/Models/Friword', 'friword_id', 'id');
    }
}

module.exports = FriwordLike
