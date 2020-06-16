<template>
  <div class="dictionaries">
    <div class="w-10/12 md:w-2/3 lg:w-1/2">
      <div class="flex-none text-center w-full">
        <h1>Dictionary APIs</h1>
      </div>
      <div class="nav">
          <router-link to="/dictionaries/owlbot">Owlbot</router-link> |
          <router-link to="/dictionaries/merriam-webster">Merriam-Webster</router-link>
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