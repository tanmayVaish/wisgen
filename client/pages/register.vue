<template>
  <Banner>
    <RegisterForm />
  </Banner>
</template>

<script>
export default {
  name: 'register.vue',
  components: {
    Banner: () => import('~/layouts/banner.vue'),
    RegisterForm: () => import('~/components/register-form.vue'),
  },
}
</script>
