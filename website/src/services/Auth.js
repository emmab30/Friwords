import { ApiService } from './BaseService.js';

var Auth = {
    signInAnonymously: function(data, success, error) {
        let url = 'auth/anonymous';

        ApiService().post(url, data).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    }
};

export default Auth;