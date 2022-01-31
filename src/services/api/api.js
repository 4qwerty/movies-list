import axios from 'axios';
import { message } from 'antd';
import { BASE_URL_API } from './baseURL';

class API {
  get(url, params) {
    return this.makeRequest(url, 'GET', {}, {}, params);
  }

  delete(url) {
    return this.makeRequest(url, 'DELETE');
  }

  post(url, body, headers) {
    return this.makeRequest(url, 'POST', body, headers);
  }

  put(url, body, headers) {
    return this.makeRequest(url, 'PUT', body, headers);
  }

  makeRequest(url, method, body, headers, params) {
    const requestParams = {
      method: method || 'GET',
      data: body,
      params: params || {},
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
        ...(headers || {}),
      },
    };

    return this.sendRequest(url, requestParams);
  }

  sendRequest(url, requestParams) {
    return new Promise((resolve, reject) => {
      axios(BASE_URL_API + url, requestParams)
        .then(({ data }) => {
          if (data?.status === 0) {
            message.error(`ERROR: ${JSON.stringify(data?.error)}`);
            reject(data);
          }
          resolve(data);
        })
        .catch(err => {
          this.errorHandler(err);
          reject(err.response);
        });
    });
  }

  errorHandler(err) {
    if (err.response?.data) {
      message.error(`ERROR: ${JSON.stringify(err.response.data)}`);
    } else {
      message.error('ERROR: INTERNAL_SERVER_ERROR');
    }
  }
}

export default new API();
