
<template>
	<div class="app">
		<nav>
			<router-link to="/">hi-</router-link>
			<router-link to="/hello-world">hello world-</router-link>
			<router-link to="/popping">popping-</router-link>
		</nav>
		<main>
			<router-view />
		</main>
		<!-- <LoadingOverlay /> -->
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
			window.addEventListener('keypress', ({ code }) => {
				switch (code) {
					case 'Space':
						EventBus.$emit('toggle');
						break;

					case 'KeyR':
						EventBus.$emit('refresh');
						break;

					default:
						break;
				}
			});
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
