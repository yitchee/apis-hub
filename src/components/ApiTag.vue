<template>
  <div>
    <span v-if="!requireKey" class="inline-flex bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
      Requires API Key : No <i class="fi-xnsuxl-times-solid"></i>
    </span>
    <span v-else class="inline-flex bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
      Requires API Key : Yes <i class="fi-xwsuxl-check"></i>
    </span>
  </div>
</template>


<script>
export default {
  props: ['requireKey'],
}
</script>