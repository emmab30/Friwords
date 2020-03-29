'use strict'

const AnonymousUser = use('App/Models/AnonymousUser')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

class AuthController {
    async signInAnonymously({ request, response }) {
        let body = request.all();

        let exists = await AnonymousUser
            .query()
            .where('uid', body.uid)
            .getCount('id');

        let userId = null;
        if(!exists) {
            userId = await AnonymousUser.create({
                uid: body.uid,
                alias: uniqueNamesGenerator({
                    dictionaries: [adjectives, animals, colors],
                    length: 2
                })
            });
            userId = userId.id;
        } else {
            await AnonymousUser
                .query()
                .where('uid', body.uid)
                .update({
                    updated_at: new Date()
                });

            userId = await AnonymousUser
                .query()
                .where('uid', body.uid)
                .first();
            userId = userId.id;
        }

        let user = await AnonymousUser
            .query()
            .where('id', userId)
            .first();

        return response.json({
            success: true,
            user
        });
    }
}

module.exports = AuthController
