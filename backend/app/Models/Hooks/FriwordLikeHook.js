'use strict'

const Notification = use('App/Models/Notification');
const User = use('App/Models/User');
const Friword = use('App/Models/Friword');
const FriwordLike = use('App/Models/FriwordLike');
const FriwordComment = use('App/Models/FriwordComment');
const FriwordCommentLike = use('App/Models/FriwordCommentLike');

const FriwordLikeHook = exports = module.exports = {}

FriwordLikeHook.afterCreate = async (like) => {
    let friwordId = like.friword_id;
    let liker = await User.query().where('id', like.user_id).select('alias').first();

    let friword = await Friword.query().where('id', friwordId).first();
    friword.likes_qty += 1;
    await friword.save();

    let owner = await User
        .query()
        .where('alias', friword.user_alias)
        .select('id')
        .first();

    await Notification.create({
        user_id: owner.id,
        text: `A @${liker.alias} le gusta tu friword '${friword.text.substring(0, 20)}...'`,
        html: `<span style="color: #ffa000; font-weight: 800;">A @${liker.alias}</span> le gusta tu friword <b>'${friword.text.substring(0, 20)}...'</b>`,
        redirect_to: `friword/${friword.id}`,
        seen: false,
        onesignal_title: `Nuevo me gusta`,
        onesignal_message: `A @${liker.alias} le gusta '${friword.text.substring(0, 25)}...`,
        created_at: new Date(),
        updated_at: new Date()
    });
}

FriwordLikeHook.afterDelete = async (like) => {
    let friwordId = like.friword_id;

    let friword = await Friword
        .query()
        .where('id', friwordId)
        .first();
    friword.likes_qty -= 1;
    await friword.save();
}