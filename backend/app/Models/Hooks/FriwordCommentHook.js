'use strict'

const Friword = use('App/Models/Friword');
const FriwordComment = use('App/Models/FriwordComment');

const FriwordCommentHook = exports = module.exports = {}

FriwordCommentHook.afterCreate = async (comment) => {
    let friwordId = comment.friword_id;

    let friword = await Friword.query().where('id', friwordId).first();
    friword.comments_qty += 1;
    await friword.save();
}