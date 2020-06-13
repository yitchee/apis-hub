<template>
  <div class="image-view flex justify-center w-full mb-4">
    <img v-if="imgSrc.length" v-bind:src="imgSrc" class="rounded-lg sm:w-full lg:w-1/2"/>
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