
<template>
  <div class="app">
    <nav>
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </nav>
    <div></div>
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
  color: white;

  nav {
    background-color: black;
    flex-basis: 40%;
  }
}
</style>
