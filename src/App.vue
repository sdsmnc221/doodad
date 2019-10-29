
<template>
  <div class="app">
    <nav>Hello</nav>
    <div></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: function() {
    return {
      name: "Hello World!"
    };
  }
});
</script>

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
    flex-basis: 40%;
  }
}
</style>
