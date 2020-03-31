'use strict'

const User = use('App/Models/User');

class UserController {
    async getMe({ request, auth, response }) {
        try {
            await auth.check()
        } catch (error) {
            return response.json({
                success: true,
                user: null
            });
        }

        let user = await auth.getUser();
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
