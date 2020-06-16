<template>
  <div class="tv-movies">
    <div class="w-10/12 md:w-2/3 lg:w-1/2">
      <div class="flex-none text-center w-full">
        <h1>TV / Movie APIs</h1>
      </div>
      <div class="nav">
          <router-link to="/tv-movies/omdb">OMDB</router-link> |
          <router-link to="/tv-movies/tmdb">TMDB</router-link>
      </div>
      <router-view class="mb-4"/>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Movies',
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