<template>
  <div class="image-view flex justify-center w-full mb-4">
    <img v-if="imgSrc" :src="imgSrc" class="rounded-lg sm:max-w-full md:max-w-full"/>
  </div>
</template>


<script>
export default {
  name: 'ImageView',
  props: {
    imgSrc: String,
  },
}
</script>


<style>

</style>