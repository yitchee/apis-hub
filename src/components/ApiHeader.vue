<template>
  <div class="mt-4 mb-4">
    <h1 class="font-bold text-2xl">
      <a :href="apiWebsiteLink" target="_blank" class="inline-flex text-green-600 hover:text-green-800" :title="title">
      {{title}} <i class="fi-xwsuxl-external-link-solid friconix ml-2 self-center text-gray-500 text-sm"></i>
      </a>
    </h1>
  </div>
</template>


<script>
import friconixMixin from '@/mixins/friconixMixin.js';

export default {
  mixins: [friconixMixin],
  props: {
    title: String,
    apiWebsiteLink: String
  }
}
</script>