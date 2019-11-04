
<template>
  <div class="app">
    <nav>
      <router-link to="/">hi-</router-link>
      <router-link to="/hello-world">hello world-</router-link>
    </nav>
    <main>
				<router-view/>
    </main>
		<LoadingOverlay />
  </div>
</template>

<script>
import EventBus from './classes/EventBus';
import LoadingOverlay from './components/LoadingOverlay';

export default {
	name: 'App',
	components: { LoadingOverlay },
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
		position: relative;
		overflow: hidden;
		flex: 1;
		color: black;
			padding: 64px;
	}
}
</style>
