<template>
  <div>
    <nav>
      <router-link to="/">File</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/files">Files</router-link> |
      <router-link to="/drag-n-drop">drag-n-drop</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
