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
		name: 'Loadinator',
		data() {
			return {
				bounding: null,
				play: true
			};
		},
		computed: {},
		created() {
			EventBus.$on('resize', this.resize.bind(this));
			EventBus.$on('toggle', this.toggle.bind(this));
			EventBus.$on('refresh', this.refresh.bind(this));
		},
		mounted() {
			tick(() => {
				this.size();
				this.refresh();
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
				tick(this.size, 1000);
			},
			toggle(play) {
				this.play = play || !this.play;

				const doodle = this.$refs['doodle'];

				if (doodle) {
					const cells = this.cells(doodle);

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
					doodle.parentNode.style.setProperty('--color', utils.randomHexColorCode());
					doodle.update();
					this.toggle(true);
				}
			},
			cells(doodle) {
				return Array.from(doodle.shadowRoot.querySelector('.container').children);
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
			--color: $text;
		}

		--color: black;

		/* prettier-ignore */
		--doodle: (
															:doodle {
																@grid: 3 / 100%; 
																grid-gap: 72px;
																
															} 

															position: relative;
															z-index: 1;
															background-color: var(--color);
															border-radius: 100%;
															opacity: 1;
															filter: blur(0) brightness(1);
															
															animation-name: fade;
															animation-direction: alternate;
															animation-iteration-count: infinite;
															animation-fill-mode: both;
															animation-timing-function: #{$ease-in-out-quart};
															animation-duration: @r(0.4, 0.8)s;
															
															:after {
																content: '';
																display: block;
																position: absolute;
																z-index: -1;
																width: 100%;
																height: 100%;
																top: 50%;
																left: 50%;
																transform: translate(-50%, -50%) scale(0);
																background-color: var(--color);
																border-radius: 100%;
																opacity: 0;
																filter: blur(0) brightness(1);
																
																// animation-name: fade-after;
																// animation-direction: alternate;
																// animation-iteration-count: infinite;
																// animation-fill-mode: both;
																// animation-timing-function: #{$ease-in-out-quart};
																// animation-duration: @r(0.4, 0.8)s;
															}
															
															@keyframes fade {
																to {
																	opacity: 0.4;
																	// filter: blur(0.8px) brightness(0.8);
																}
															}

															@keyframes fade-after {
																to {
																	transform: translate(-50%, -50%) scale(@r(1.2, 1.6));
																	opacity: 0.4;
																	filter: blur(1.2px) brightness(1.2);
																}
															}
															
														)
		/* prettier-ignore */
	}
</style>