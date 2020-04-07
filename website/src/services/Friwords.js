import { ApiService } from './BaseService.js';

var Friwords = {
    getFriwords: function(success, error) {
        let url = 'friwords';

        ApiService().get(url).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    getFriwordsByFilter: function(filter, success, error) {
        let url = 'friwords/filter';

        ApiService().post(url, filter).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    getFriwordById: function(id, success, error) {
        let url = `friwords/${id}`;

        ApiService().get(url).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    getPossibleMentionsByFriwordId: function(id, success, error) {
        let url = `friwords/${id}/possible_mentions`;

        ApiService().get(url).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    likeById: function(id, success, error) {
        let url = `friwords/${id}/like`;

        ApiService().post(url).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    likeCommentById: function(id, success, error) {
        let url = `friwords/comments/${id}/like`;

        ApiService().post(url).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    dislikeById: function(id, success, error) {
        let url = `friwords/${id}/dislike`;

        ApiService().post(url).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    postFriword: function(data, success, error) {
        let url = 'friwords';

        ApiService().post(url, data).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    postComment: function(data, success, error) {
        let url = `friwords/${data.friword_id}/comments`;

        ApiService().post(url, data).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    hasUpdatesAvailable: function(lastId, success, error) {
        let url = `friwords/updates_available/${lastId}`;

        ApiService().get(url).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    }
};

export default Friwords;