<template>
  <Banner>
    <ForgotPassword />
  </Banner>
</template>

<script>
export default {
  name: 'Forgot',
  components: {
    Banner: () => import('~/layouts/banner.vue'),
    ForgotPassword: () => import('~/components/forgot-password-form.vue'),
  },
}
</script>
