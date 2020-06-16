<template>
  <div class="mb-3">
    <input @keyup.enter="inputSubmit" type="text" v-model="inputVal" :id="inputId"
    class="bg-white focus:outline-none focus:shadow-outline focus:opacity-50 border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal">
  </div>
</template>


<script>
export default {
  data: function() {
    return {
    }
  },
  props: ['inputId'],
  methods: {
    inputSubmit: function() {
      this.$emit('inputSubmit');
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>