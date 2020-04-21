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
            return response.json({
                success: false,
                message: 'Ese usuario ya está registrado. Elige otro alias'
            });
        }
    }

    async signInWithFacebook ({ request, auth, ally, response }) {
        const { token } = request.all();
        if(token != null) {
            let user = await ally
                .driver('facebook')
                .getUserByToken(token);

            if(user != null) {
                user = user.toJSON();

                console.log("[Auth] Logging in user", user.email);

                let retVal = null;
                try {

                    // Set the email in case it's null
                    if(user.email == null)
                        user.email = `${user.id}@facebook.com`;

                    retVal = await this.userFindOrCreate(auth, user, 'Friwords2020!_', request.all());
                } catch (err) {
                    // Do nothing
                    console.log(err);
                }

                return response.json(retVal);
            } else {
                return response.json({
                    success: false,
                    message: 'No se pudo obtener tu usuario. Prueba registrándote de otro modo.'
                });
            }
        }
    }

    async userFindOrCreate(auth, user, password, extraData) {

        let username = uniqueNamesGenerator({
            dictionaries: [adjectives, countries, animals, colors],
            length: 2,
            style: 'lowerCase'
        })
        .replace(' ', '')
        .replace('&', '_');;
        /*if(user.name != null) {
            let split = user.name.split(' ');
            if(!split) {
                username = this.makeid(6) + Math.floor(100 + Math.random() * 900);
            } else {
                username = split[0].substring(0, 3).toUpperCase() + split[1].substring(0, 3).toUpperCase() + Math.floor(100 + Math.random() * 900);
            }
        }*/

        let objToCreate = {
            email: user.email,
            password: password,
            username: username,
            alias: username,
            name: user.name
        };
        if(user.id) objToCreate.social_id = user.id;

        const toFetch = await User.findOrCreate({ email: user.email }, objToCreate);

        if(extraData) {
            if(extraData.push_notification_token != null)
                toFetch.notification_id = extraData.push_notification_token;
            if(extraData.appVersion != null)
                toFetch.app_version = extraData.appVersion;
            if(extraData.snType != null)
                toFetch.provider = extraData.snType;
            if(extraData.app_version != null)
                toFetch.provider = extraData.app_version;
            if(user.name != null && toFetch.username == null) {
                let split = user.name.split(' ');
                toFetch.name = user.name;
                toFetch.username = split[0].substring(0, 3).toUpperCase() + split[1].substring(0, 3).toUpperCase() + Math.floor(100 + Math.random() * 900);
            }

            if(user.id != null && toFetch.provider == 'facebook'){
                toFetch.social_id = user.id;
            }

            toFetch.save();
        }

        const userEntity = toFetch.toJSON();

        const logged = await auth.generate(userEntity);

        return {
            success: true,
            token: logged.token,
            user: toFetch.toJSON()
        };
    }

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

module.exports = AuthController