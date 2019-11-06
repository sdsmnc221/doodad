<template>
	<div class="wrapper" @resize="resize">
		<css-doodle ref="doodle" use="var(--doodle)"></css-doodle>
		<img :src="error" alt />
	</div>
</template>

<script>
	import 'css-doodle';
	import anime from 'animejs';

	import EventBus from '../classes/EventBus';
	import utils from '../utils';

	import Error from '../assets/error.png';

	const { tick } = utils;

	export default {
		name: 'HelloWorld',
		data() {
			return {
				bounding: null,
				play: true
			};
		},
		computed: {
			error() {
				return Error;
			}
		},
		created() {
			EventBus.$on('resize', this.resize.bind(this));
			EventBus.$on('toggle', this.toggle.bind(this));
			EventBus.$on('refresh', this.refresh.bind(this));
		},
		mounted() {
			tick(this.size, 1000);
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
				tick(this.size, 1000);
			},
			toggle(play) {
				this.play = play || !this.play;

				const doodle = this.$refs['doodle'];

				if (doodle) {
					const cells = doodle.shadowRoot.querySelector('.container').children;
					if (this.play) {
						anime.set(cells, { animationPlayState: 'running' });
					} else {
						anime.set(cells, { animationPlayState: 'paused' });
					}
				}
			},
			refresh() {
				const doodle = this.$refs['doodle'];

				if (doodle) {
					doodle.update();
					this.toggle(true);
				}
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

		/* prettier-ignore */
		--doodle: (
					:doodle {
						@grid: 20 / 100%; 
						grid-gap: 2px;
					} 

					position: relative;
					transform: scale(1) translate(0) rotate(@rand(360deg));

					:after {
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
		/* prettier-ignore */
	}
</style>