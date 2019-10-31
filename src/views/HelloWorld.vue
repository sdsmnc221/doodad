<template>
  <div class="wrapper" @resize="resize">
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
import EventBus from '../classes/EventBus';

export default {
	name: 'HelloWorld',
	data() {
		return {
			bounding: null
		};
	},
	mounted() {
		setTimeout(() => {
			this.size();
		}, 1000);

		EventBus.$on('resize', this.resize);
	},
	methods: {
		size() {
			this.bounding = this.$el.getBoundingClientRect();

			const { width, height } = this.bounding;
			const doodle = this.$refs['doodle'];

			if (width > height) {
				doodle.style.width = `${height}px`;
			} else {
				doodle.style.height = `${width}px`;
			}
		},
		resize() {
			this.size();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../styles/theme';

css-doodle {
	@include abs-center();
}
</style>