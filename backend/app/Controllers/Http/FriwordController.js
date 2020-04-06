'use strict'

const _ = require('lodash');
const User = use('App/Models/User');
const Friword = use('App/Models/Friword');
const Notification = use('App/Models/Notification');
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

        let user = null;
        try {
            user = await auth.getUser();

            /*if(user == null){
                return response.json({
                    success: true,
                    friword: null
                });
            }*/
        } catch (exception) {
            /*return response.json({
                success: true,
                friwords: null
            });*/
        }


        const perPage = 10;
        let friwords = Friword
            .query()
            .limit(perPage)
            .offset(body.page > 0 ? body.page * perPage : 0)
            .with('user', (query) => {
                query.select(['id', 'alias', 'country_code', 'gender']);
            })
            .orderBy('created_at', 'DESC');

        if(body.only_me == true) {
            if(user != null) {
                friwords.where('user_alias', user.alias);
            } else {
                return response.json({ success: true, friwords: [] });
            }
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
                query
                    .orderBy('created_at', 'DESC')
                    .with('user', (subquery) => {
                        subquery.select('id', 'alias', 'country_code', 'gender')
                    })
            })
            .with('user', (query) => {
                query.select(['id', 'alias', 'country_code', 'gender']);
            })
            .first();

        return response.json({
            success: true,
            friword: friword
        });
    }

    async getPossibleMentionsByFriwordId({ request, auth, response }) {
        let user = await auth.getUser();
        let friword = await Friword
            .query()
            .where('id', request.params.id)
            .with('comments', (query) => {
                query
                    .orderBy('created_at', 'DESC')
                    .with('user', (subquery) => {
                        subquery.select('id', 'alias', 'country_code')
                    })
            })
            .with('user', (query) => {
                query.select(['id', 'alias', 'country_code', 'gender']);
            })
            .first();

        friword = friword.toJSON()
        let mentions = [];
        if(friword && friword.user && friword.user.alias){
            mentions.push({
                alias: friword.user.alias
            });
        }

        for(var idx in friword.comments) {
            const comment = friword.comments[idx];
            if(comment && comment.user && comment.user.alias && comment.user.alias != user.alias) {
                mentions.push({
                    alias: comment.user.alias
                });
            }
        }

        mentions = _.uniqBy(mentions, 'alias');

        return response.json({
            success: true,
            mentions: mentions
        });
    }

    async postFriword({ request, response }) {
        let body = request.all();
        let friword = await Friword.create({
            title: body.title,
            text: body.text,
            user_alias: body.user_alias,
            // gender: body.gender,
            comments_qty: 0,
            likes_qty: 0,
            dislikes_qty: 0
        });

        return response.json({
            success: true,
            friword
        });
    }

    async postFriwordComment({ request, auth, response }) {
        let body = request.all();
        let user = await auth.getUser();
        let friword = await Friword
            .query()
            .where('id', request.params.id)
            .with('user')
            .first();

        // Check if there is any mention on this
        let html = body.text;
        if(body.text.indexOf('@') > -1) {
            var pattern = /\B@[a-z0-9_-]+/gi;
            let mentions = body.text.match(pattern);
            let promises = [];
            if(mentions && mentions.length > 0) {
                for(var idx in mentions) {
                    const mention = mentions[idx];
                    console.log(mention.replace('@', ''));
                    html = html.replace(mention, `<span class="mention">${mention}</span>`)
                    promises.push(new Promise((resolve, reject) => {
                        User
                            .query()
                            .where('alias', mention.replace('@', ''))
                            .select(['id'])
                            .first()
                            .then((user) => {
                                if(user != null) {
                                    Notification.create({
                                        user_id: user.id,
                                        text: `@${body.user_alias} te mencionó en el friword '${friword.text.substring(0, 30)}...'`,
                                        html: `<span style="color: #ffa000; font-weight: 800;">@${body.user_alias}</span> te mencionó en el friword <b>'${friword.text.substring(0, 30)}...'</b>`,
                                        redirect_to: `friword/${friword.id}`,
                                        seen: false,
                                        created_at: new Date(),
                                        updated_at: new Date()
                                    }).then((data) => {
                                        resolve();
                                    });
                                }
                            });
                    }));
                }
            }
        }

        let friwordComment = await FriwordComment.create({
            friword_id: request.params.id,
            user_alias: body.user_alias,
            text: body.text,
            html: html,
            likes: 0,
            dislikes: 0
        });

        if(friword && friword.user) {
            friword = friword.toJSON();

            if(friword.user.alias != body.user_alias) {
                await Notification.create({
                    user_id: friword.user.id,
                    text: `@${body.user_alias} hizo un comentario en tu friword '${friword.text.substring(0, 30)}...'`,
                    html: `<span style="color: #ffa000; font-weight: 800;">@${body.user_alias}</span> hizo un comentario en tu friword <b>'${friword.text.substring(0, 30)}...'</b>`,
                    seen: false,
                    redirect_to: `friword/${friword.id}`,
                    created_at: new Date(),
                    updated_at: new Date()
                });
            }
        }

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
