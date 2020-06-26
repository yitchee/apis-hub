<template>
  <div class="mb-3">
    <input @keyup.enter="inputSubmit" type="number" v-model="inputVal" :id="inputId" :placeholder="placeholderText"
    class="bg-white focus:border-blue-400 border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal">
  </div>
</template>


<script>
export default {
  data: function() {
    return {
    }
  },
  props: ['inputId', 'val', 'placeholderText'],
  methods: {
    inputSubmit: function() {
      this.$emit('inputSubmit');
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.val;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>


<style scoped>
input[type='number'] {
  -moz-appearance:textfield;
}
</style>