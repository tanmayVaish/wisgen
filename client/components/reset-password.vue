<template>
  <form class="font-poppins w-full md:flex md:flex-col my-6">
    <input
      class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm w-full mb-5"
      type="password"
      placeholder="New Password"
    />
    <input
      class="border border-[#DCDEE5] focus:outline-none focus:ring-2 focus:ring-black p-2 rounded-sm w-full"
      type="password"
      placeholder="Confirm New Password"
    />
    <button
      class="bg-[#F1C12B] text-[#121317] font-semibold rounded-[4px] p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-black md:mt-6"
    >
      Reset Password
    </button>
  </form>
</template>

<script setup lang="ts"></script>
