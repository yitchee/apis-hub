<template>
  <div class="mb-4">
    <h2 class="font-semibold">Request URL</h2>
    <code v-if="requestUrl" v-html="requestUrl" class="overflow-x-auto w-full"></code>
  </div>
</template>


<script>
export default {
  name: 'VRequestUrl',
  props: ['requestUrl'],
}
</script>


<style lang="scss">
  
</style>