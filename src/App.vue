<template>
  <div id="app">
    <div id="nav" class="w-full text-center">
      <router-link to="/" exact>Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/images">Images</router-link> |
      <router-link to="/tv-movies">TV/Movies</router-link> |
       <router-link to="/dictionaries">Dictionaries</router-link>
    </div>
    <router-view class="flex justify-center"/>
  </div>
</template>


<script>

</script>


<style>
body { margin: 0; }

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
  color: #268dec;
}
</style>
