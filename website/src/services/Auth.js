import { ApiService } from './BaseService.js';

var Auth = {
    signInAnonymously: function(data, success, error) {
        let url = 'auth/anonymous';

        ApiService().post(url, data).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    signInWithAlias: function(data, success, error) {
        let url = 'auth/anonymous/credentials';

        ApiService().post(url, data).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    setPasswordAnonymousUser: function(data, success, error) {
        let url = 'auth/anonymous/onboard/set_password';

        ApiService().post(url, data).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    getMe: function(success, error) {
        let url = 'profile/me';

        ApiService().get(url).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    updateMe: function(data, success, error) {
        let url = 'profile/me';

        ApiService().post(url, data).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    }
};

export default Auth;