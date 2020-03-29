'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FriwordCommentSchema extends Schema {
    up() {
        this.create('friword_comments', table => {
            table.increments();
            table.integer('friword_id').unsigned().index()
            table
                .foreign("friword_id")
                .references("id")
                .on("friwords");
            table.string('user_alias').nullable();
            table.string('text');
            table.integer('likes').default(0);
            table.integer('dislikes').default(0);
            table.timestamps();
        });
    }

    down() {
        this.drop('friword_comments');
    }
}

module.exports = FriwordCommentSchema;
