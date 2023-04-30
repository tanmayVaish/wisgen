<template>
  <div>
    <h1>Get Verified Page</h1>
    <div>Click the link sent to your mail to Get Verified!</div>
  </div>
</template>

<script>
export default {
  name: 'GetVerified',
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
}
</script>
