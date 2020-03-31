'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
    up() {
        this.create('users', table => {
            table.increments();
            table
                .string('username', 80)
                .notNullable()
                .unique();
            table
                .string('alias', 80)
                .notNullable()
                .unique();
            table
                .string('email', 254)
                .notNullable()
                .unique();

            table.string('gender').notNullable();
            table.string('password', 60).notNullable();
            table.boolean('is_configured').default(false);

            // Extra data
            table.string('country_code').nullable();
            table.string('country_name').nullable();
            table.string('ip').nullable();
            table.timestamps();
        });
    }

    down() {
        this.drop('users');
    }
}

module.exports = UserSchema;
