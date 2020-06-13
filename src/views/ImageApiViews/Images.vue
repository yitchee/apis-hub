<template>
  <div class="images">
    <div class="w-10/12 md:w-2/3 lg:w-1/2">
      <div class="flex-none text-center w-full">
        <h1>Images API</h1>
      </div>
      <div class="nav">
          <router-link to="/images/cat">Random.cat</router-link> |
          <router-link to="/images/dog">Random.dog</router-link> |
          <router-link to="/images/picsum">Picsum.photos</router-link>
      </div>
      <keep-alive>
        <router-view class="mb-4"/>
      </keep-alive>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Images',
  data: function() {
    return {

    }
  },
  methods: {

  },
}
</script>


<style scoped>
  h1 {
    @apply font-bold text-3xl;
  }
</style>