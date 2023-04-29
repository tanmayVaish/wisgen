<template>
  <Banner>
    <LoginForm />
  </Banner>
</template>

<script>
export default {
  name: 'Login',
  components: {
    Banner: () => import('~/layouts/banner.vue'),
    LoginForm: () => import('~/components/login-form.vue'),
  },
}
</script>
