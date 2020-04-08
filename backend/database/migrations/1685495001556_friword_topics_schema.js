'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FriwordTopicsSchema extends Schema {
    up() {
        this.create('friword_topics', table => {
            table.increments();
            table.string('name');
            table.timestamps();
        });
    }

    down() {
        this.drop('friword_topics');
    }
}

module.exports = FriwordTopicsSchema;