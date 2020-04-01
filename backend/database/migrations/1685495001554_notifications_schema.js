'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class NotificationsSchema extends Schema {
    up() {
        this.create('notifications', table => {
            table.increments();
            table.integer('user_id');
            table.string('html', 500);
            table.string('text', 500);
            table.boolean('seen').default(false);
            table.timestamps();
        });
    }

    down() {
        this.drop('notifications');
    }
}

module.exports = NotificationsSchema;