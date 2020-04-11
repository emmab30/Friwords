import log from 'loglevel';
import remote from 'loglevel-plugin-remote';
import { GetToken } from './BaseService';

const customJSON = log => {
    return {
        msg: typeof log.message == 'Object' ? JSON.stringify(log.message) : log.message,
        level: log.level.label
    }
};

remote.apply(log, { format: customJSON, url: `${process.env.REACT_APP_API_URL}logs/client` });
log.enableAll();

var Logs = {
    object: (json) => {
        const token = GetToken();
        if(token != null)
            remote.setToken(token)
        log.info('%j', json);
    },
    info: (text) => {
        const token = GetToken();
        if(token != null)
            remote.setToken(token)
        log.info(text);
    },
    warn: (text) => {
        const token = GetToken();
        if(token != null)
            remote.setToken(token)
        log.warn(text);
    }
};

export default Logs;