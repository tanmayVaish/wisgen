<template>
  <form
    class="w-full md:flex md:flex-col my-6 font-poppins"
    @submit.prevent="handleForgotPassword"
  >
    <input
      class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm w-full"
      type="text"
      placeholder="Registered Email"
    />
    <button
      type="submit"
      class="bg-[#F1C12B] text-[#121317] font-semibold rounded-[4px] p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-black md:mt-6"
    >
      Email me on a Recovery Link
    </button>
    <button
      type="button"
      class="bg-[#FEFCF4] border border-[#A9871E] text-[#A9871E] font-semibold rounded-[4px] p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-black"
      @click="handleReturnToLogin"
    >
      Return to Sign In
    </button>
  </form>
</template>

<script>
export default {
  name: 'ForgotPasswordForm',
  methods: {
    handleForgotPassword() {
      alert('Forgot Password')
    },
    handleReturnToLogin() {
      this.$router.push('/login')
    },
  },
}
</script>
