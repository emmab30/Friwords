'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const FriwordLike = use('App/Models/FriwordLike');

class Friword extends Model {
    comments() {
        return this.hasMany('App/Models/FriwordComment');
    }

    user() {
        return this.hasOne('App/Models/User', 'user_alias', 'alias');
    }

    topic() {
        return this.hasOne('App/Models/FriwordTopic', 'topic_id', 'id');
    }

    static async IsLikedBy(friwordId, userId) {
        let liked = await FriwordLike
            .query()
            .where('user_id', userId)
            .where('friword_id', friwordId)
            .getCount('id');

        return liked > 0;
    }
}

module.exports = Friword
