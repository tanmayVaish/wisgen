<template>
  <div class="grid place-content-center">
    <h1
      class="text-4xl font-bold text-center text-black md:text-5xl lg:text-6xl"
    >
      Index Page
    </h1>
    <div class="px-4 py-2 mt-4 text-white bg-green rounded-md shadow-md">
      You are successfully Logged In!
    </div>
    <button
      class="px-4 py-2 text-white bg-red rounded-md shadow-md"
      @click="logout"
    >
      Logout
    </button>
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
      this.$router.push('/login')
    },
  },
})
</script>
