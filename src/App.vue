<template>
  <div id="app" class="flex flex-col min-h-screen">
    <div id="nav" class="w-full text-center">
      <router-link to="/" exact>Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/images">Images</router-link> |
      <router-link to="/tv-movies">TV/Movies</router-link> |
      <router-link to="/dictionaries">Dictionaries</router-link>
    </div>
    <router-view id="main-router-view" class="flex justify-center flex-grow" />
    <VFooter></VFooter>
  </div>
</template>


<script>
import VFooter from '@/components/VFooter';


export default {
  name: 'App',
  components: {
     VFooter,
  }
}
</script>


<style>
body, html { 
  margin: 0;
  height: 100%;
}

#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-active {
  color: #42b983;
}

a.router-link-active {
  @apply .font-bold .text-blue-400
}

#main-router-view {

}
</style>
