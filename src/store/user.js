import { defineStore } from 'pinia';
import userApi from '@/services/userAPIService';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
    };
  },
  actions: {
    async login(formData) {
      await userApi.login(formData);
      await this.fetchUser();
    },
    async fetchUser() {
      const { data } = await userApi.getUser();
      this.user = data;
    },
    async logout() {
      this.user = null;
      return userApi.logout();
    },
  },
  getters: {
    fullName() {
      const { firstName, lastName } = this.user?.person || {};
      return this.user ? `${firstName} ${lastName}`.trim() : '';
    },
    initials() {
      const { firstName, lastName } = this.user?.person || {};
      return this.user
        ? `${firstName?.at(0)}${lastName?.at(0)}`.toUpperCase()
        : '';
    },
    isLoggedIn() {
      return !!this.user?.id;
    },
  },
});
