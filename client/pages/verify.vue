<template></template>

<script>
export default {
  name: 'Verify',
  mounted() {
    if (this.$route.query.token) {
      fetch('/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: this.$route.query.token,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 'email_verified' && this.$cookies.get('token')) {
            this.$router.push('/')
          } else {
            this.$router.push('/login')
          }
        })
    }
  },
}
</script>
