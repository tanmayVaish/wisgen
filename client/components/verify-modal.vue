<template>
  <div
    v-if="mailsent"
    id="staticModal"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-40 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-[#121317] bg-opacity-70 p-4"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b border-b-[#DCDEE5] rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Verify Email
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="staticModal"
            @click="handleCancel"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Please verify your account. We have sent an email to
            <span class="font-extrabold text-black">{{ email }}</span
            >. If you are unable to find the verification email please contact
            us at: +91-9380644532
          </p>
        </div>
        <!-- Modal footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerifyModal',
  components: {},
  props: {
    email: String,
    mailsent: Boolean,
  },
  methods: {
    handleCancel() {
      this.$props.mailsent = false
      this.$router.push('/get-verified')
    },
  },
}
</script>
