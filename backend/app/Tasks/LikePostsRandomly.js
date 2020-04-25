'use strict';

const Task = use('Task');
const User = use('App/Models/User')
const Friword = use('App/Models/Friword');
const FriwordLike = use('App/Models/FriwordLike');
const { uniqueNamesGenerator, adjectives, colors, animals, countries } = require('unique-names-generator');
const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, countries, colors, animals] });
const moment = require('moment');

class LikePostsRandomly extends Task {
    static get schedule() {
        return '*/5 * * * * *';
    }

    async handle() {
        const randomNumber = Math.random();

        let alias = uniqueNamesGenerator({
            dictionaries: [adjectives, countries, animals, colors],
            length: 1,
            style: 'lowerCase'
        })
        .replace(' ', '')
        .replace('&', '_')
        .toLowerCase();

        console.log("Generated user dummy " + alias);
        User.create({
            username:  alias,
            alias: alias,
            is_dummy_user: true,
            email: `${alias}@friwords.com`,
            password: 'fekaa',
            notification_id: null,
            gender: Math.random() > 0 ? 'male' : 'female',
            is_configured: true,
            created_at: new Date(),
            updated_at: new Date()
        });

        /*if(randomNumber > 0.8) {
            let friwords = await Friword
                .query()
                .where('created_at', '>=', moment().subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'))
                .fetch();
            friwords = friwords.toJSON();

            for(var idx in friwords) {
                FriwordLike.create({

                });
            }
        }*/
    }
}

module.exports = LikePostsRandomly;
