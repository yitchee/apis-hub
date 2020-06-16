<template>
  <div class="vbutton text-center mb-4">
    <button @click="clicked" class="btn btn-blue" :class="{'cursor-not-allowed opacity-50': isLoadingResult}">
      Try It
    </button>
  </div>
</template>


<script>
export default {
  methods: {
    clicked: function() {
      this.$emit('clicked');
    }
  },
  computed: {
    isLoadingResult: function() {
      return this.$store.getters.isLoadingResult
    }
  }
}
</script>


<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>