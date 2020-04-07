'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FriwordCommentLikesSchema extends Schema {
    up() {
        this.create('friword_comment_likes', table => {
            table.increments();
            table.integer('user_id');
            table.integer('comment_id');
            table.timestamps();
        });
    }

    down() {
        this.drop('friword_comment_likes');
    }
}

module.exports = FriwordCommentLikesSchema;