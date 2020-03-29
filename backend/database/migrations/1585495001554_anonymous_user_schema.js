'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AnonymousUserSchema extends Schema {
    up() {
        this.create('anonymous_users', table => {
            table.increments();
            table.string('uid');
            table.string('alias');
            table.timestamps();
        });
    }

    down() {
        this.drop('anonymous_user');
    }
}

module.exports = AnonymousUserSchema;