<template>
	<div class="wrapper" @resize="resize">
		<css-doodle ref="doodle" use="var(--doodle)"></css-doodle>
	</div>
</template>

<script>
	import 'css-doodle';
	import anime from 'animejs';

	import EventBus from '../classes/EventBus';
	import utils from '../utils';


	const { tick } = utils;

	export default {
		name: 'Popping',
		data() {
			return {
				bounding: null,
				play: true
			};
		},
		computed: {
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

		$color: rgb(random(255), random(255), random(255));

		/* prettier-ignore */
		--doodle: (
					:doodle {
						@grid: 20 / 100%; 
						grid-gap: 10px;
						
					} 

					position: relative;
					border-radius: 100%;
					border: thin solid #{$color};
					background-color: white;
					overflow: visible;

					:after {
						content: '';
						display: block;
						position: absolute;
						z-index: -1;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: #{$color};
						border-radius: 100%;
					}

					animation-name: pop;
					animation-direction: reverse;
					animation-iteration-count: infinite;
					animation-fill-mode: none;
					animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
					animation-duration: @rand(12s);
					animation-delay: @rand(2s);

					@keyframes pop {
						to {
							transform: translate(2px, 2px);
						}
					}
				);
		/* prettier-ignore */
	}
</style>