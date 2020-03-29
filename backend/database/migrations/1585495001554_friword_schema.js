'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FriwordSchema extends Schema {
    up() {
        this.create('friwords', table => {
            table.increments();
            table.string('user_alias').nullable();
            table.string('title');
            table.string('text');
            table.string('gender');
            table.integer('comments_qty').default(0);
            table.integer('likes_qty').default(0);
            table.integer('dislikes_qty').default(0);
            table.timestamps();
        });
    }

    down() {
        this.drop('friwords');
    }
}

module.exports = FriwordSchema;