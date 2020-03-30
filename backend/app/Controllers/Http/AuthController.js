'use strict'

const Encryption = use('Encryption')
const Hash = use('Hash')
const User = use('App/Models/User')
const AnonymousUser = use('App/Models/AnonymousUser')
const { uniqueNamesGenerator, adjectives, colors, animals, countries } = require('unique-names-generator');
const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, countries, colors, animals] });
const axios = require('axios');

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
                    dictionaries: [adjectives, countries, animals, colors],
                    length: 2,
                    style: 'lowerCase'
                })
                .replace(' ', '')
                .replace('&', '_')
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

        // Request for country
        /*const apiKey = '45c816eed2d04a8b96e59ff177c609af';
        const ipInfo = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&fields=geo&output=json`);*/

        // Create the user and send the JWT token
        let userInfo = await User.create({
            username: body.alias,
            alias: body.alias,
            email: `${body.alias}@friwords.com`,
            password: body.password,
            is_configured: true,
            /*country_name: ipInfo && ipInfo.data && ipInfo.data.country_name,
            country_code: ipInfo && ipInfo.data && ipInfo.data.country_code2,
            ip: ipInfo && ipInfo.data && ipInfo.data.ip,*/
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
