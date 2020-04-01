'use strict'

const User = use('App/Models/User');
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

        return response.json({
            success: true,
            user
        });
    }

    async updateMe({ request, auth, response }) {
        let user = await auth.getUser();
        let body = request.all();

        user = await User.find(user.id);
        user.merge(body);
        await user.save();

        return response.json({
            success: true,
            user: user
        });
    }
}

module.exports = UserController
