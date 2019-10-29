
<template>
  <div class="app">
    <nav>
      <router-link to="/">hi-</router-link>
      <router-link to="/hello-world">hello world-</router-link>
    </nav>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
@import "./styles";

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;

  nav {
    background-color: black;
    color: white;
    flex-basis: 40%;

    a {
      display: block;
    }
  }

  main {
    overflow: hidden;
    color: black;
    flex: 1;
  }
}
</style>
