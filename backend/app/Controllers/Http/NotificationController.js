'use strict'

const Notification = use('App/Models/Notification');

class NotificationController {

    async getMe({ request, auth, response }) {
        let user = await auth.getUser();
        let notifications = await Notification
            .query()
            .limit(10)
            .orderBy('created_at', 'DESC')
            .where('user_id', user.id)
            // .where('seen', false)
            .fetch();

        await Notification
            .query()
            .where('user_id', user.id)
            .where('seen', false)
            .update({
                seen: true
            });

        return response.json({
            success: true,
            notifications: notifications
        });
    }

    async updateNotification({ request, auth, response }) {
        let id = request.params.id;
        await Notification
            .query()
            .where('id', id)
            .update({
                seen: request.body.seen
            });

        return response.json({
            success: true
        });
    }
}

module.exports = NotificationController