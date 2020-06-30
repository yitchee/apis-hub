<template>
  <div class="home w-full flex-wrap">
    <div class="w-full">
      <img alt="Vue logo" class="flex-none self-start w-1/8 mx-auto" src="../assets/logo.png">
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" class=""/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
