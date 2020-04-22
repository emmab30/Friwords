'use strict'

const Notification = use('App/Models/Notification');
const User = use('App/Models/User');
const OneSignal = require('onesignal-node');
const client = new OneSignal.Client('dc8495cf-d343-4c38-94cf-883cc60c7aee', 'Y2MwZjE2NmEtZWMwYS00Y2RlLWIyZWQtOTkxNDAxYWMwNDZi');

const NotificationHook = exports = module.exports = {}

NotificationHook.afterCreate = async (notification) => {
    if(notification.onesignal_title != null && notification.onesignal_message != null) {
        // Send the push notification
        let user = await User
            .query()
            .where('id', notification.user_id)
            .whereNotNull('notification_id')
            .select(['id', 'notification_id'])
            .first();
        if(user != null) {
            const response = await client.createNotification({
                contents: {
                    es: notification.onesignal_message,
                    en: notification.onesignal_message
                },
                headings: {
                    es: notification.onesignal_title,
                    en: notification.onesignal_title
                },
                include_player_ids: [user.notification_id]
            });

            if(response && response.body.id) {
                await Notification
                    .query()
                    .where('id', notification.id)
                    .update({
                        onesignal_id: response.body.id
                    });
            }
        }
    }
}