'use strict'

const Friword = use('App/Models/Friword');
const FriwordComment = use('App/Models/FriwordComment');

class FriwordController {

    async getFriwords({ request, response }) {
        let friwords = await Friword
            .query()
            .limit(20)
            .orderBy('created_at', 'DESC')
            .fetch();

        return response.json({
            success: true,
            friwords: friwords
        });
    }

    async getFriwordsByFilter({ request, auth, response }) {
        const body = request.all();

        const perPage = 10;
        let user = auth.getUser();
        let friwords = Friword
            .query()
            .limit(perPage)
            .offset(body.page > 0 ? body.page * perPage : 0)
            .orderBy('created_at', 'DESC');

        if(body.only_me == true) {
            friwords.where('alias', user.alias);
        } else if(body.listing_mode != null) {
            friwords.where('listing_mode', body.listing_mode);
        }

        friwords = await friwords.fetch()

        return response.json({
            success: true,
            friwords: friwords
        });
    }

    async getFriwordById({ request, response }) {
        let friword = await Friword
            .query()
            .where('id', request.params.id)
            .with('comments', (query) => {
                query.orderBy('created_at', 'DESC')
            })
            .first();

        return response.json({
            success: true,
            friword: friword
        });
    }

    async postFriword({ request, response }) {
        let body = request.all();
        let friword = await Friword.create({
            title: body.title,
            text: body.text,
            user_alias: body.user_alias,
            gender: body.gender,
            comments_qty: 0,
            likes_qty: 0,
            dislikes_qty: 0
        });

        return response.json({
            success: true,
            friword
        });
    }

    async postFriwordComment({ request, response }) {
        let body = request.all();
        let friwordComment = await FriwordComment.create({
            friword_id: request.params.id,
            user_alias: body.user_alias,
            text: body.text,
            likes: 0,
            dislikes: 0
        });

        return response.json({
            success: true,
            comment: friwordComment
        });
    }

    async likeById({ request, response }) {
        let friwordId = request.params.id;
        let friword = await Friword
            .query()
            .where('id', friwordId)
            .first();
        friword.likes_qty += 1;
        await friword.save();

        return response.json({
            success: true
        });
    }

    async dislikeById({ request, response }) {
        let friwordId = request.params.id;
        let friword = await Friword
            .query()
            .where('id', friwordId)
            .first();
        friword.dislikes_qty += 1;
        await friword.save();

        return response.json({
            success: true
        });
    }

    async hasUpdatesAvailable({ request, response }) {
        let lastId = request.params.lastId;
        let lastIdDatabase = await Friword
            .query()
            .limit(1)
            .orderBy('created_at', 'DESC')
            .select('id')
            .first();

        if(lastIdDatabase.id > lastId)
            return response.json({ success: true, hasUpdates: true });

        return response.json({ success: true, hasUpdates: false });
    }
}

module.exports = FriwordController
