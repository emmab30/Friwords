'use strict'

const _ = require('lodash');
const moment = require('moment');
const Database = use('Database');
const User = use('App/Models/User');
const Friword = use('App/Models/Friword');
const FriwordTopic = use('App/Models/FriwordTopic');
const FriwordLike = use('App/Models/FriwordLike');
const Notification = use('App/Models/Notification');
const FriwordCommentLike = use('App/Models/FriwordCommentLike');
const FriwordComment = use('App/Models/FriwordComment');

class FriwordController {

    async getFriwords({ request, response }) {
        const perPage = 4;
        let friwords = await Friword
            .query()
            .limit(perPage)
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
        try { user = await auth.getUser(); } catch (exception) { }


        const perPage = 4;
        let friwords = Friword
            .query()
            .limit(perPage)
            .offset(body.page > 0 ? body.page * perPage : 0)
            .with('user', (query) => {
                query.select(['id', 'alias', 'country_code', 'gender']);
            })
            .with('topic', (query) => {
                query.select(['id', 'name']);
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

        if(body.topic_id != null) {
            friwords.where('topic_id', body.topic_id);
        }

        friwords = await friwords.fetch()
        friwords = friwords.toJSON();

        /* Query RAW SQL to get CE */
        /*
            SELECT
                users.id,
                users.alias,
                (SELECT COUNT(friwords.id) FROM friwords) as total_friwords,
                (SELECT COUNT(friword_comments.id) FROM friword_comments) as total_comments,
                (SELECT COUNT(friword_likes.id) FROM friword_likes) as total_likes,
                (SELECT COUNT(friword_comments.id) FROM friword_comments WHERE user_alias = users.alias AND created_at >= ${minDate}) as did_comments,
                (SELECT COUNT(friwords.id) FROM friwords WHERE friwords.user_alias = users.alias AND created_at >= ${minDate}) as pushed_friwords,
                (SELECT COUNT(friword_comments.id) FROM friwords INNER JOIN friword_comments ON friword_comments.friword_id = friwords.id WHERE friwords.user_alias = users.alias AND friword_comments.created_at >= ${minDate}) as received_comments
            FROM users
            GROUP BY users.id
            ORDER BY did_comments DESC, received_comments DESC, pushed_friwords DESC
            LIMIT 5;
        */

        // Append featured items
        let minDate = moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00');
        let featured = await Database.raw(`SELECT users.id, users.alias, (SELECT COUNT(friwords.id) FROM friwords) as total_friwords, (SELECT COUNT(friword_comments.id) FROM friword_comments) as total_comments, (SELECT COUNT(friword_likes.id) FROM friword_likes) as total_likes, (SELECT COUNT(friword_comments.id) FROM friword_comments WHERE user_alias = users.alias AND created_at >= '${minDate}') as did_comments, (SELECT COUNT(friwords.id) FROM friwords WHERE friwords.user_alias = users.alias AND created_at >= '${minDate}') as pushed_friwords, (SELECT COUNT(friword_comments.id) FROM friwords INNER JOIN friword_comments ON friword_comments.friword_id = friwords.id WHERE friwords.user_alias = users.alias AND friword_comments.created_at >= '${minDate}') as received_comments FROM users GROUP BY users.id ORDER BY did_comments DESC, received_comments DESC, pushed_friwords DESC LIMIT 5;`);

        // Analyze CE for user


        featured = featured[0];
        if(featured.length > 0) {
            let featuredPromises = [];
            for(var idx in featured) {
                const featuredItem = featured[idx];
                if(featuredItem.alias) {
                    featuredPromises.push(new Promise((resolve, reject) => {
                        User
                            .query()
                            .where('alias', featuredItem.alias)
                            .select(['id', 'alias', 'avatar'])
                            .first()
                            .then((user) => {
                                user.cr_rate = parseFloat((featuredItem.did_comments + featuredItem.pushed_friwords + featuredItem.received_comments) * 100 / (featuredItem.total_friwords + featuredItem.total_comments + featuredItem.total_likes)).toFixed(2);
                                resolve(user);
                            })
                    }));
                }
            }

            await Promise.all(featuredPromises).then((values) => {
                values = _.orderBy(values, (e) => e.cr_rate).reverse();
                featured = values;
            });
        }

        /*let featured = await User
            .query()
            .limit(10)
            .select(['id', 'alias'])
            .fetch();*/

        // Check what friwords was liked for me
        let promises = [];
        if(user != null) {
            for(var idx in friwords) {
                promises.push(new Promise((resolve, reject) => {
                    const friword = friwords[idx];
                    Friword.IsLikedBy(friword.id, user.id).then((value) => {
                        friword.liked = value;
                        resolve(friword);
                    });
                }));
            }
        } else {
            promises.push(new Promise((resolve, reject) => {
                resolve(friwords);
            }));
        }

        await Promise.all(promises).then((values) => {
            if(values.length == 1 && values[0].length > 0)
                values = values[0];

            return response.json({
                success: true,
                friwords: values,
                featured: featured
            });
        });
    }

    async getFriwordById({ request, auth, response }) {
        let user = null;
        try { user = await auth.getUser(); } catch (exception) { }

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
            .with('topic', (query) => {
                query.select(['id', 'name']);
            })
            .first();

        friword = friword.toJSON();

        if(user != null) {
            const liked = await Friword.IsLikedBy(friword.id, user.id);
            friword.liked = liked;

            for(var idx in friword.comments) {
                const comment = friword.comments[idx];
                if(comment) {
                    comment.liked = await FriwordComment.IsLikedBy(comment.id, user.id);
                } else {
                    comment.liked = false;
                }
            }
        }

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
                alias: friword.user.alias.toLowerCase()
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

    async postFriword({ request, auth, response }) {
        let user = await auth.getUser();
        let body = request.all();
        let friword = await Friword.create({
            title: body.title,
            text: body.text,
            user_alias: user.alias,
            topic_id: body.topic_id,
            image: body.image,
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
        let loggedUser = await auth.getUser();
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
                                        text: `@${loggedUser.alias} te mencionó en el friword '${friword.text.substring(0, 30)}...'`,
                                        html: `<span style="color: #ffa000; font-weight: 800;">@${loggedUser.alias}</span> te mencionó en el friword <b>'${friword.text.substring(0, 30)}...'</b>`,
                                        redirect_to: `friword/${friword.id}`,
                                        seen: false,
                                        onesignal_title: 'Te mencionaron en un friword',
                                        onesignal_message: `@${loggedUser.alias} te mencionó en el friword '${friword.text.substring(0, 30)}...'`,
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
            user_alias: loggedUser.alias,
            text: body.text,
            html: html,
            likes_qty: 0,
            dislikes_qty: 0
        });

        if(friword && friword.user) {
            friword = friword.toJSON();

            if(friword.user.alias != loggedUser.alias) {
                await Notification.create({
                    user_id: friword.user.id,
                    text: `@${loggedUser.alias} hizo un comentario en tu friword '${friword.text.substring(0, 30)}...'`,
                    html: `<span style="color: #ffa000; font-weight: 800;">@${loggedUser.alias}</span> hizo un comentario en tu friword <b>'${friword.text.substring(0, 30)}...'</b>`,
                    seen: false,
                    redirect_to: `friword/${friword.id}`,
                    onesignal_title: 'Nuevo comentario en tu Friword',
                    onesignal_message: `@${loggedUser.alias} hizo un comentario en tu friword '${friword.text.substring(0, 30)}...'`,
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

    /* Like friword by id */
    async likeById({ request, auth, response }) {
        let user = await auth.getUser();
        let friwordId = request.params.id;

        let status = null;

        if(user) {
            // Unlike or like
            let hasLiked = await FriwordLike
                .query()
                .where('user_id', user.id)
                .where('friword_id', friwordId)
                .getCount('id');

            if(hasLiked == 0) {
                status = 'liked';
                await FriwordLike.create({
                    user_id: user.id,
                    friword_id: friwordId
                });
            } else {
                status = 'liked';
                /*let friwordLike = await FriwordLike.query().where('user_id', user.id).where('friword_id', friwordId).first();
                if(friwordLike) {
                    friwordLike.delete();
                    status = 'unliked';
                }*/
            }
        }

        return response.json({
            success: true,
            status
        });
    }

    async likeCommentById({ request, auth, response }) {
        let user = await auth.getUser();
        let commentId = request.params.id;

        let status = null;
        if(user) {
            // Unlike or like
            let hasLiked = await FriwordCommentLike
                .query()
                .where('user_id', user.id)
                .where('comment_id', commentId)
                .getCount('id');

            if(hasLiked == 0) {
                status = 'liked';
                await FriwordCommentLike.create({
                    user_id: user.id,
                    comment_id: commentId
                });
            } else {
                status = 'liked';
                /*let comment = await FriwordCommentLike.query().where('user_id', user.id).where('comment_id', commentId).first();
                if(comment) {
                    await comment.delete();
                    status = 'unliked';
                }*/
            }
        }

        return response.json({
            success: true,
            status
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

    /* Topics */

    async getTopics({ request, auth, response }){
        const topics = await FriwordTopic
            .query()
            .fetch();

        return response.json({
            success: true,
            topics
        });
    }
}

module.exports = FriwordController