'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FriwordLikesSchema extends Schema {
    up() {
        this.create('friword_likes', table => {
            table.increments();
            table.integer('user_id');
            table.integer('friword_id');
            table.timestamps();
        });
    }

    down() {
        this.drop('friword_likes');
    }
}

module.exports = FriwordLikesSchema;