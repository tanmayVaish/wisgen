<template>
  <form class="w-full md:flex md:flex-col my-6 font-poppins">
    <input
      class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm w-full mb-3"
      type="text"
      placeholder="Email or Mobile Number"
    />
    <input
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

<script setup lang="ts"></script>
