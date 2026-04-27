<template>
  <div v-if="route.query.mode === 'resetPassword'">
    <PasswordReset />
  </div>
  <div v-if="route.query.mode === 'forgotPassword'">
    <ForgotPassword />
  </div>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <div v-if="route.query.mode === 'verifyEmail'">
    <VerifyEmail />
  </div>
</template>

<script setup lang="ts">
import PasswordReset from '~/pages/password-reset.vue';
import ForgotPassword from '~/pages/forgot-password.vue';
import VerifyEmail from '~/pages/verify-email.vue';

const route = useRoute();

useHead({
  title: () => {
    switch (route.query.mode) {
      case 'resetPassword':
        return 'Reset Password';
      case 'forgotPassword':
        return 'Forgot Password';
      case 'verifyEmail':
        return 'Verify Email';
    }
  },
});
</script>
