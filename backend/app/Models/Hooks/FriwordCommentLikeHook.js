'use strict'

const Notification = use('App/Models/Notification');
const User = use('App/Models/User');
const Friword = use('App/Models/Friword');
const FriwordLike = use('App/Models/FriwordLike');
const FriwordComment = use('App/Models/FriwordComment');
const FriwordCommentLike = use('App/Models/FriwordCommentLike');

const FriwordCommentLikeHook = exports = module.exports = {}

FriwordCommentLikeHook.afterCreate = async (commentLike) => {
    let commentId = commentLike.comment_id;
    let liker = await User.query().where('id', commentLike.user_id).select('alias').first();

    let comment = await FriwordComment.query().where('id', commentId).first();
    let friword = await Friword.query().where('id', comment.friword_id).select(['id', 'text']).first();
    comment.likes_qty += 1;
    await comment.save();

    let owner = await User
        .query()
        .where('alias', comment.user_alias)
        .select('id')
        .first();

    await Notification.create({
        user_id: owner.id,
        text: `A @${liker.alias} le gusta tu comentario en '${friword.text.substring(0, 20)}...'`,
        html: `<span style="color: #ffa000; font-weight: 800;">A @${liker.alias}</span> le gusta tu comentario en <b>'${friword.text.substring(0, 20)}...'</b>`,
        redirect_to: `friword/${friword.id}`,
        seen: false,
        onesignal_title: 'Le gusta tu comentario',
        onesignal_message: `A @${liker.alias} le gusta tu comentario en '${friword.text.substring(0, 20)}...'`,
        created_at: new Date(),
        updated_at: new Date()
    });
}

FriwordCommentLikeHook.afterDelete = async (commentLike) => {
    let commentId = commentLike.comment_id;

    let comment = await FriwordComment.query().where('id', commentId).first();
    comment.likes_qty -= 1;
    await comment.save();
}