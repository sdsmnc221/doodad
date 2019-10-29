<template>
	<div class="wrapper">
		<css-doodle ref="doodle">
			:doodle {
			@grid: 10 / 100%;
			}
			background: #60569e;
			transform: scale(@rand(.2, .9));
		</css-doodle>
	</div>
</template>

<script>
	import 'css-doodle';

	export default {
		name: 'HelloWorld',
		data() {
			return {
				bounding: null
			};
		},
		mounted() {
			setTimeout(() => {
				this.bounding = this.$el.getBoundingClientRect();

				const { width, height } = this.bounding;
				const doodle = this.$refs['doodle'];

				if (width > height) {
					doodle.style.width = `${height}px`;
				} else {
					doodle.style.height = `${width}px`;
				}
			}, 1000);
		}
	};
</script>

<style lang="scss" scoped>
	@import '../styles/theme';

	css-doodle {
		@include abs-center();
	}
</style>