'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FriwordCommentLike extends Model {
    static boot() {
        super.boot();

        this.addHook('afterCreate', 'FriwordCommentLikeHook.afterCreate');
        this.addHook('afterDelete', 'FriwordCommentLikeHook.afterDelete');
    }
}

module.exports = FriwordCommentLike
