'use strict';

const Task = use('Task');
const User = use('App/Models/User');
const Friword = use('App/Models/Friword');
const FriwordLike = use('App/Models/FriwordLike');
const { uniqueNamesGenerator, adjectives, colors, animals, countries } = require('unique-names-generator');
const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, countries, colors, animals] });
const moment = require('moment');

class LikePostsRandomly extends Task {
    static get schedule() {
        return '* */20 * * * *';
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

        /*console.log("Generated user dummy " + alias);
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
        });*/

        if(this.getTimeCategory(moment()) == 'DAWN' || this.getTimeCategory(moment()) == 'MORNING') {
            console.log("No es hora para enviar fake news");
            return;
        }

        if (randomNumber > 0.5) {
            let friwords = await Friword.query()
                .where(
                    'created_at',
                    '>=',
                    moment()
                        .subtract(4, 'day')
                        .format('YYYY-MM-DD HH:mm:ss')
                )
                .fetch();
            friwords = friwords.toJSON();

            if (friwords.length > 0) {
                const user = await User.create({
                    username: alias,
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

                let promises = [];
                for (var idx in friwords) {
                    const friword = friwords[idx];
                    promises.push(
                        FriwordLike.create({
                            user_id: user.id,
                            friword_id: friword.id,
                            created_at: new Date(),
                            updated_at: new Date()
                        })
                    );
                }

                Promise.all(promises).then((values) => {
                    console.log(`Deleting dummy user`);
                    user.delete();
                });
            }
        }
    }

    getTimeCategory(time) {
        let timeCategory = '';
        const timeFormat = 'HH:mm:ss';

        if (
            time.isBetween(moment('00:00:00', timeFormat), moment('04:59:59', timeFormat)) ||
            time.isSame(moment('00:00:00', timeFormat)) ||
            time.isSame(moment('04:59:59', timeFormat))
        ) {
            timeCategory = 'DAWN';
        } else if (
            time.isBetween(moment('05:00:00', timeFormat), moment('11:59:59', timeFormat)) ||
            time.isSame(moment('05:00:00', timeFormat)) ||
            time.isSame(moment('11:59:59', timeFormat))
        ) {
            timeCategory = 'MORNING';
        } else if (
            time.isBetween(moment('12:00:00', timeFormat), moment('16:59:59', timeFormat)) ||
            time.isSame(moment('12:00:00', timeFormat)) ||
            time.isSame(moment('16:59:59', timeFormat))
        ) {
            timeCategory = 'NOON';
        } else if (
            time.isBetween(moment('17:00:00', timeFormat), moment('23:59:59', timeFormat)) ||
            time.isSame(moment('17:00:00', timeFormat)) ||
            time.isSame(moment('23:59:59', timeFormat))
        ) {
            timeCategory = 'NIGHT';
        }

        return timeCategory;
    }
}

module.exports = LikePostsRandomly;
