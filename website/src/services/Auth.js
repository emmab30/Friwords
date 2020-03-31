import { ApiService } from './BaseService.js';

var Auth = {
    register: function(data, success, error) {
        let url = 'auth/register';

        ApiService().post(url, data).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    signInWithAlias: function(data, success, error) {
        let url = 'auth/sign_in';

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
    },
    generateRandomAlias: function(success, error) {
        let url = 'auth/generate_alias';

        ApiService().get(url).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    }
};

export default Auth;