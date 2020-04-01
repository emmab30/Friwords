import { ApiService } from './BaseService.js';

var Notifications = {
    getNotifications: function(success, error) {
        let url = 'notifications/me';

        ApiService().get(url).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    },
    updateNotification: function(data, success, error) {
        let url = `notifications/${data.id}/update`;

        ApiService().post(url, data).then((response) => {
            if(success) success(response.data);
        }).catch((err) => {
            if(error) error(err);
        });
    }
};

export default Notifications;