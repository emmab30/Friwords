'use strict'

const Encryption = use('Encryption')
const Hash = use('Hash')
const User = use('App/Models/User')
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

    async signInAnonymouslyWithCredentials({ request, auth, response }) {
        let body = request.all();

        let user = await User
            .query()
            .where('alias', body.alias)
            .first();

        if(!user){
            return response.json({
                success: false,
                message: 'No existe ese alias en nuestro sistema'
            });
        }

        const isValid = await Hash.verify(body.password, user.password);
        if(isValid) {
            const token = await auth.generate(user);
            return response.json({
                success: true,
                user,
                token: token.token
            });
        }

        return response.json({
            success: false,
            message: 'La contraseña no es válida'
        });
    }

    async setPasswordAnonymousUser({ request, auth, response }) {
        let body = request.all();

        let user = await AnonymousUser
            .query()
            .where('alias', body.alias)
            .where('is_configured', 0)
            .first();

        if(!user){
            return response.json({
                success: false,
                message: 'No puedes cambiar la contraseña de ese alias'
            });
        }

        // Create the user and send the JWT token
        let userInfo = await User.create({
            username: body.alias,
            alias: body.alias,
            email: `${body.alias}@friwords.com`,
            password: body.password,
            is_configured: true,
            created_at: new Date(),
            updated_at: new Date()
        });

        user.is_configured = true;
        await user.save();

        let token = await auth.generate(userInfo);

        return response.json({
            success: true,
            userInfo,
            token: token.token
        });
    }
}

module.exports = AuthController
