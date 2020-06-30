<template>
  <div v-if="showResult" class="w-full">
    <VRequestUrl :requestUrl="requestUrl"></VRequestUrl>
    <VJsonResponse :apiResult="apiResult"></VJsonResponse>
  </div>
</template>


<script>
import VRequestUrl from '@/components/VRequestUrl.vue';
import VJsonResponse from '@/components/VJsonResponse.vue';


export default {
  name: 'VRequestResponse',
  components: {
    VRequestUrl,
    VJsonResponse
  },
  props: {
    requestUrl: String,
    apiResult: [Object, Array, String],
    showResult: Boolean,
  },
}
</script>


<style lang="scss">
  
</style>