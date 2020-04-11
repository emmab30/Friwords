'use strict'

const Notification = use('App/Models/Notification');

class LogController {

    async logClient({ request, auth, response }) {
        let log = request.all();
        let user = await auth.getUser();
        let messages = log.logs;
        for(var idx in messages) {
            console.log(`[Log from client from user ${user.alias}]`, messages[idx].msg);
        }

        return response.json({
            success: true
        });
    }
}

module.exports = LogController