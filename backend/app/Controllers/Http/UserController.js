'use strict'

class UserController {
    async getMe({ request, auth, response }) {
        let user = await auth.getUser();

        return response.json({
            success: true,
            user
        });
    }

    async updateMe({ request, auth, response }) {
        let user = await auth.getUser();
        let body = request.all();

        return response.json({
            success: true,
            user
        });
    }
}

module.exports = UserController
