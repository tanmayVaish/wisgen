<template>
  <div>
    <h1>Index Page</h1>
    <div>You are successfully Logged In!</div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {},
  mounted() {
    // get cookie
    const cookie = this.$cookies.get('token')
    console.log(cookie)

    if (cookie) {
      // redirect to dashboard
      this.$router.push('/')
    } else {
      // redirect to login
      this.$router.push('/login')
    }
  },
  methods: {
    logout() {
      this.$cookies.remove('token')
    },
  },
})
</script>
