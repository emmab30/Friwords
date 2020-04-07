'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const FriwordCommentLike = use('App/Models/FriwordCommentLike');

class FriwordComment extends Model {
    static boot() {
        super.boot();

        this.addHook('afterCreate', 'FriwordCommentHook.afterCreate');
    }

    user() {
        return this.hasOne('App/Models/User', 'user_alias', 'alias');
    }

    static async IsLikedBy(commentId, userId) {
        let liked = await FriwordCommentLike
            .query()
            .where('user_id', userId)
            .where('comment_id', commentId)
            .getCount('id');

        return liked > 0;
    }
}

module.exports = FriwordComment
