import axios from 'axios';
import querystring from 'querystring';

export default class HTTPService {

    SetCUId = (id) => {
        this.cuid = id;
    }

    loadapi = (api, data = {}, spin = true) => {
        return new Promise((resolve) => {
            if (spin) {
                window.application.spinOn();
            }
            if (this.cuid) {
                data.cuid = this.cuid;
            }
            this.HTTPserve(api, data).then(res => {
                if (!res) {
                    this.interval = setInterval(() => { this.serve(api, data, resolve) }, 10000);
                } else {
                    resolve(res);
                }
            });
        });
    }
    serve = (api, data = {}, resolve) => {
        return axios.post(`http://harisautomation.com/global/api/${api}`,
            querystring.stringify(data)
        ).then(response => {
            clearInterval(this.interval);
            resolve(response.data);
            return response.data;
        }).catch(e => {
            return false;
        });
    }
    HTTPserve = (api, data = {}, obj, key) => {
        data.cuid = this.cuid;
        return axios.post(`http://harisautomation.com/global/api/${api}`,
            querystring.stringify(data)
        ).then(response => {
            if (obj) {
                obj[key] = response.data;
            }
            return response.data;
        }).catch(e => {
            return false;
            //  return setTimeout(() =>{ this.loadapi(api, data)}, 990000);
        });
    }
    HTTPserveGet = (api, data = {}, obj, key) => {
        data.cuid = this.cuid;
        return axios.get(`http://harisautomation.com/global/api/${api}`, {
            params: data
        }).then(response => {
            if (obj) {
                obj[key] = response.data;
            }
            return response.data;
        }).catch(e => {
            return false;
            //  return setTimeout(() =>{ this.loadapi(api, data)}, 990000);
        });
    }
}
