'use strict'

const Encryption = use('Encryption')
const Hash = use('Hash')
const User = use('App/Models/User')
const AnonymousUser = use('App/Models/AnonymousUser')
const { uniqueNamesGenerator, adjectives, colors, animals, countries } = require('unique-names-generator');
const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, countries, colors, animals] });
const axios = require('axios');

class AuthController {
    async signInWithAlias({ request, auth, response }) {
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

    async generateRandomAlias({ request, response }) {
        let alias = uniqueNamesGenerator({
            dictionaries: [adjectives, countries, animals, colors],
            length: 2,
            style: 'lowerCase'
        })
        .replace(' ', '')
        .replace('&', '_');

        return response.json({
            success: true,
            alias
        });
    }

    async register({ request, auth, response }) {
        let body = request.all();

        // Create the user and send the JWT token
        try {
            let user = await User.create({
                username: body.alias,
                alias: body.alias,
                email: `${body.alias}@friwords.com`,
                password: body.password,
                gender: body.gender,
                is_configured: true,
                created_at: new Date(),
                updated_at: new Date()
            });

            await user.save();

            let token = await auth.generate(user);

            return response.json({
                success: true,
                user,
                token: token.token
            });
        } catch (exception) {
            console.log(exception);
            return response.json({
                success: false,
                message: 'Ese usuario ya está registrado. Elige otro alias'
            });
        }
    }
}

module.exports = AuthController
