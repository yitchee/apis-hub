<template>
  <div v-if="jsonResponse != null" class="p-4 bg-gray-200 rounded-lg mb-4">
    <pre v-text="jsonResponse" class="overflow-x-auto text-xs w-full"></pre>
  </div>
</template>


<script>
export default {
  name: 'VJsonResponse.vue',
  data() {
    return {
      jsonResponse: '',
    }
  },
  props: {
    apiResult: Object
    },
  watch: {
    apiResult: {
      handler: 'changeJsonResult',
      immediate: true,
      deep: true
    },
  },
  methods: {
    changeJsonResult: function() {
      console.log("TEST")
      this.jsonResponse = JSON.stringify(this.apiResult, undefined, 2);
    }
  },

}
</script>


<style scoped>

</style>