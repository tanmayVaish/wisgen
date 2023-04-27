<template>
  <Banner>
    <LoginForm />
  </Banner>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginForm from '~/components/login-form.vue'
import Banner from '~/layouts/banner.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { Banner, LoginForm },
})
</script>
