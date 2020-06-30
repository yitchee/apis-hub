<template>
  <div class="mb-3">
    <input @keyup.enter="inputSubmit" type="text" :id="inputId" :placeholder="placeholderText"
    v-bind:value="value" v-on:input="$emit('input', $event.target.value)"
    class="bg-white focus:border-blue-400 border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal">
  </div>
</template>


<script>
export default {
  data: function() {
    return {
    }
  },
  props: ['inputId', 'placeholderText', 'value'],
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