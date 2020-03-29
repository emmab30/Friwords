import axios from 'axios';
import axiosRetry from 'axios-retry';

/** This function configure the Axios library **/

var ENVIRONMENTS = {
    LOCAL: 'http://localhost:3333/api/v1/',
    PRODUCTION: 'https://api.friwords.com/api/v1/'
};

var BASE_URL = ENVIRONMENTS.PRODUCTION;
var JWT_TOKEN = null;

export function ApiService(timeout = 15000, headers) {

    if(!headers) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        if(JWT_TOKEN) {
            headers['Authorization'] = 'Bearer ' + JWT_TOKEN;
        }
    }

    // Instance the webservice caller
    var api = axios.create({
        baseURL: getBaseUrl(),
        timeout: timeout,
        headers: headers
    });

    api.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            alert("error");
        }

        return error;
    });

    axiosRetry(api, {
        retries: 5,
        retryDelay: (retryCount) => {
            return retryCount * 1000;
        }
    });

    return api;
}

export function setBaseUrl(baseUrl) {
    if(baseUrl == null) {
        BASE_URL = ENVIRONMENTS.PRODUCTION;
    } else {
        BASE_URL = baseUrl;
    }
}

export function getBaseUrl() {
    return BASE_URL;
}

export function encodeQueryData(parameters) {
    let ret = [];
    for (let d in parameters)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(parameters[d]));
    return ret.join('&');
}