import API from './api';

export default {
  login({ username, password }) {
    return API.post('login', { username, password });
  },
  getUser() {
    return API.get('user');
  },
  logout() {
    return API.post('logout');
  },
};
