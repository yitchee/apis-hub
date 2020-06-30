<template>
  <div>
    <span v-if="limit" class="inline-flex bg-purple-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
      Request Limits : {{limit}} 
    </span>
  </div>
</template>


<script>
export default {
  props: ['limit'],
}
</script>