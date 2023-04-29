<template>
  <form
    class="w-full md:flex md:flex-col my-6 font-poppins"
    @submit.prevent="login"
  >
    <div class="mb-3">
      <input
        v-model="email"
        class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm w-full"
        type="text"
        placeholder="Email or Mobile Number"
      />
      <div
        v-if="mobileError"
        class="text-[#D92D20] placeholder:text-red-400 font-poppins text-xs md:text-sm mt-1 w-full"
      >
        Sorry! This mobile number is not registered.
      </div>
      <div
        v-if="emailError"
        class="text-[#D92D20] placeholder:text-red-400 font-poppins text-xs md:text-sm mt-1 w-full"
      >
        Sorry! This email is not registered.
      </div>
    </div>
    <div class="mb-3">
      <input
        v-model="password"
        :class="passwordError ? 'border-[#D92D20]' : 'border-[#DCDEE5]'"
        class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm w-full"
        type="password"
        placeholder="Password"
      />
      <div
        v-if="passwordError"
        class="text-[#D92D20] placeholder:text-red-400 font-poppins text-xs md:text-sm mt-1 w-full"
      >
        Sorry! Password entered is incorrect
      </div>
    </div>
    <a href="/forgot" class="text-right text-[#2558E5] font-semibold"
      >Forgot Password</a
    >
    <button
      class="bg-[#F1C12B] text-[#121317] font-semibold rounded-[4px] p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-black md:mt-6"
      :disabled="!email || !password"
    >
      Sign In
    </button>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',

      emailError: false,
      mobileError: false,
      passwordError: false,
    }
  },
  methods: {
    login() {
      fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            this.$router.push('/')
          } else if (data.status === 'emailError') {
            this.emailError = true
          } else if (data.status === 'mobileError') {
            this.mobileError = true
          } else if (data.status === 'passwordError') {
            this.passwordError = true
          } else {
            console.log(data.message)
          }
        })
    },
  },
}
</script>
