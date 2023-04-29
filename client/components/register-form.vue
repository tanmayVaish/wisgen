<template>
  <form
    class="w-full md:flex md:flex-col my-6 font-poppins"
    @submit.prevent="handleRegister"
  >
    <input
      v-model="firstName"
      class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm w-full mb-3"
      type="text"
      placeholder="First Name"
    />
    <input
      v-model="lastName"
      class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm w-full mb-3"
      type="text"
      placeholder="Last Name"
    />
    <div class="flex">
      <select
        name="country"
        class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm mb-3 mr-2"
      >
        <option
          v-for="(item, i) in country_code"
          :key="i"
          :value="item.country"
        >
          {{ item.country }}
        </option>
      </select>

      <input
        v-model="mobile"
        class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm mb-3 w-full"
        type="number"
        placeholder="Mobile Number"
      />
    </div>
    <input
      v-model="email"
      class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm w-full mb-3"
      type="text"
      placeholder="Email Address"
    />
    <input
      v-model="password"
      class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm w-full mb-3"
      type="password"
      placeholder="Password"
    />

    <a class="text-right text-[#2558E5] font-semibold">Forgot Password</a>
    <button
      class="bg-[#F1C12B] text-[#121317] font-semibold rounded-[4px] p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-black md:mt-6"
    >
      Sign In
    </button>
  </form>
</template>
<script>
export default {
  name: 'register-form.vue',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobile: '',
      country_code: [
        {
          country: 'India',
          code: '+91',
          initials: 'in',
        },
        {
          country: 'United States',
          code: '+1',
          initials: 'us',
        },
        {
          country: 'United Kingdom',
          code: '+44',
          initials: 'uk',
        },
      ],
    }
  },
  mounted() {},
  updated() {},
  methods: {
    handleRegister() {
      fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          mobile: this.mobile,
          areaCode: '+91',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
        .catch((err) => console.log(err))
    },
  },
}
</script>
