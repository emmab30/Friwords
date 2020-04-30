'use strict'

const Database = use('Database');
const User = use('App/Models/User');
const Friword = use('App/Models/Friword');
const FriwordComment = use('App/Models/FriwordComment');
const Notification = use('App/Models/Notification');

class UserController {
    async getMe({ request, auth, response }) {
        try {
            await auth.check();
        } catch (error) {
            return response.json({
                success: true,
                user: null
            });
        }

        let user = await auth.getUser();

        // Append featured items
        let myCR = await Database.raw("SELECT users.id, users.alias, (SELECT COUNT(friwords.id) FROM friwords) as total_friwords, (SELECT COUNT(friword_comments.id) FROM friword_comments) as total_comments, (SELECT COUNT(friword_likes.id) FROM friword_likes) as total_likes, (SELECT COUNT(friword_comments.id) FROM friword_comments WHERE user_alias = users.alias) as did_comments, (SELECT COUNT(friwords.id) FROM friwords WHERE friwords.user_alias = users.alias) as pushed_friwords, (SELECT COUNT(friword_comments.id) FROM friwords INNER JOIN friword_comments ON friword_comments.friword_id = friwords.id WHERE friwords.user_alias = users.alias) as received_comments FROM users INNER JOIN friword_likes ON friword_likes.user_id = users.id WHERE users.id = " + user.id + " GROUP BY users.id ORDER BY did_comments DESC, received_comments DESC, pushed_friwords;");
        myCR = myCR[0][0];
        myCR = parseFloat((myCR.did_comments + myCR.pushed_friwords + myCR.received_comments) * 100 / (myCR.total_friwords + myCR.total_comments + myCR.total_likes)).toFixed(2);

        // Update the updated_at date to know when logged in this user
        await User
            .query()
            .where('id', user.id)
            .update({
                updated_at: new Date()
            });

        // Get unread notifications
        user.unread_notifications = await Notification
            .query()
            .where('user_id', user.id)
            .where('seen', false)
            .getCount('id');
        user.cr_rate = myCR;

        return response.json({
            success: true,
            user
        });
    }

    async updateMe({ request, auth, response }) {
        let user = await auth.getUser();
        let body = request.all();

        let newAlias = request.body.alias;
        let oldAlias = null;

        try {
            user = await User.find(user.id);
            oldAlias = user.alias;
            user.merge(body);
            await user.save();

            // If goes here, everything is ok
            await Friword.query().where('user_alias', oldAlias).update({ user_alias: newAlias });
            await FriwordComment.query().where('user_alias', oldAlias).update({ user_alias: newAlias });
        } catch (exception) {
            if(exception && exception.code == 'ER_DUP_ENTRY') {
                return response.json({
                    success: false,
                    message: 'El alias que intentas colocar ya existe. Escoge uno nuevo'
                });
            } else {
                return response.json({
                    success: false,
                    message: 'Hubo un problema al modificar tu perfil'
                });
            }
        }

        return response.json({
            success: true,
            user: user
        });
    }

    async updateMetadata({ request, auth, response }) {
        let user = await auth.getUser();
        let body = request.all();
        
        await User
            .query()
            .where('id', user.id)
            .update({
                app_version: body.appVersion,
                platform: body.platform,
                last_login: new Date()
            });

        return response.json({
            success: true
        });
    }
}

module.exports = UserController
