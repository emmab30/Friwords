'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FriwordComment extends Model {
    static boot() {
        super.boot();

        this.addHook('afterCreate', 'FriwordCommentHook.afterCreate');
    }
}

module.exports = FriwordComment
