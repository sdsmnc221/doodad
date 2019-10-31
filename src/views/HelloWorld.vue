<template>
  <div class="wrapper" @resize="resize">
    <css-doodle ref="doodle" use="var(--doodle)"></css-doodle>
    <img :src="error" alt>
  </div>
</template>

<script>
import 'css-doodle';
import EventBus from '../classes/EventBus';

import Error from '../assets/error.png';

export default {
	name: 'HelloWorld',
	data() {
		return {
			bounding: null
		};
	},
	computed: {
		error() {
			return Error;
		}
	},
	created() {
		EventBus.$on('resize', this.resize.bind(this));
	},
	mounted() {
		setTimeout(() => {
			this.size();
		}, 1000);
	},
	methods: {
		size() {
			this.bounding = this.$el.getBoundingClientRect();

			const { width, height } = this.bounding;
			const doodle = this.$refs['doodle'];

			if (doodle) {
				if (width > height) {
					doodle.style.width = `${height}px`;
				} else {
					doodle.style.height = `${width}px`;
				}
			}
		},
		resize() {
			setTimeout(() => {
				this.size();
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../styles/theme';

.wrapper {
	img {
		@include abs-center();
		z-index: 9;
		box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.4);
	}

	css-doodle {
		@include abs-center();
	}

	// prettier-ignore
	--doodle: (
		:doodle {
			@grid: 20 / 100%; 
			grid-gap: 2px;
		} 

		position: relative;
		transform: scale(1) translate(0) rotate(@rand(360deg));

		:after {
			/* content: 'f*ck';
			font-size: @rand(0.6rem, 1.8rem);
			font-weight: @pick(100, 300, 500, 900); */
			content: '';
			width: @rand(60%, 100%);
			height: @rand(60%, 100%);
			background-image: url('../assets/cursor.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: block;
		}

		animation-name: fly;
		animation-direction: reverse;
		animation-iteration-count: infinite;
		animation-fill-mode: none;
		animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
		animation-duration: @rand(12s);
		animation-delay: @rand(2s);

		@keyframes fly {
			to {
				transform: scale(0) translate(calc(@rand(-100%, 100%) * @index()), calc(@rand(-100%, 100%) * @index())) rotate(@rand(360deg));
				opacity: 0;
			}
		}
	);
}
</style>