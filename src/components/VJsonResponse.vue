<template>
  <div v-if="apiResult">
    <h2 class="font-semibold">API Response</h2>
    <simplebar data-simplebar-auto-hide="true" class="p-4 bg-gray-200 rounded-lg mb-4 overflow-x-auto max-h-json-res  p-4">
      <pre v-text="jsonResponse" class="overflow-x-auto text-xs w-full"></pre>
    </simplebar>
  </div>
</template>


<script>
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';


export default {
  name: 'VJsonResponse.vue',
  components: {
    simplebar,
  },
  data() {
    return {
      jsonResponse: '',
    }
  },
  props: {
    apiResult: [Object, Array],
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
      this.jsonResponse = JSON.stringify(this.apiResult, undefined, 2);
    }
  },

}
</script>


<style scoped>
</style>