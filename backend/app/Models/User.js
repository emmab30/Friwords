'use strict';

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
    static boot() {
        super.boot();

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password);
            }
        });
    }

    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    tokens() {
        return this.hasMany('App/Models/Token');
    }

    static get computed () {
        return ['avatar']
    }

    getAvatar () {
        if(this.id == 162)
            return 'https://i.ibb.co/4fqFJ4x/friwords-admin.png';
        else if(this.avatar != null) {
            return this.avatar;
        }

        return 'https://i.ibb.co/MDDbjf2/logo-friwords.png';
        /*if(this.gender == 'female')
            return 'https://i.ibb.co/w0KgC2x/female.png';
        else if(this.gender == 'male')
            return 'https://i.ibb.co/B2BYsS1/male.png';

        return 'https://i.ibb.co/94PvVzb/logo-friwords.png';*/
    }
}

module.exports = User;
