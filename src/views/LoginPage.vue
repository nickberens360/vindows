<template>
  <EmptyLayout class="login-page">
    <h1 class="d-flex justify-center mb-16">
      Login page
    </h1>
    <VContainer>
      <VRow justify="center">
        <VCol lg="4">
          <VCard elevation="3">
            <VCardText class="pb-0">
              <VForm
                ref="loginForm"
                @keypress.enter="login()"
              >
                <VTextField
                  v-model="username"
                  label="Username"
                  :rules="[(v) => !!v || 'Required']"
                />
                <VTextField
                  v-model="password"
                  label="Password"
                  type="password"
                  :rules="[(v) => !!v || 'Required']"
                />
              </VForm>
            </VCardText>

            <VCardActions class="px-4">
              <VBtn
                color="primary"
                variant="outlined"
                block
                class="mb-3"
                @click="login()"
              >
                Login
              </VBtn>
            </VCardActions>
          </VCard>

          <VAlert
            v-show="invalidCredentials"
            text
            dense
            color="error"
            transition="scale-transition"
            class="mt-3"
          >
            Invalid credentials
          </VAlert>
        </VCol>
      </VRow>
    </VContainer>
  </EmptyLayout>
</template>
<script>
import EmptyLayout from '@/components/layouts/EmptyLayout';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import { mapStores } from 'pinia';

export default {
  name: 'LoginPage',
  components: {
    EmptyLayout,
  },
  data: () => ({
    username: '',
    password: '',
    invalidCredentials: false,
  }),
  computed: {
    ...mapStores(useAppStore, useUserStore),
  },
  methods: {
    async login() {
      const { username, password } = this;
      this.invalidCredentials = false;
      if (this.$refs.loginForm.validate()) {
        try {
          await this.userStore.login({ username, password });
          this.appStore.setEnvConfig();
          this.$router.push('/dashboard');
        } catch (error) {
          this.invalidCredentials = true;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
