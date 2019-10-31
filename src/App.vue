
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

<script>
import EventBus from './classes/EventBus';

export default {
	name: 'App',
	mounted() {
		window.addEventListener('resize', () => EventBus.$emit('resize'));
	}
};
</script>


<style lang="scss">
@import './styles';

.app {
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
		padding: 64px;
	}
}
</style>
