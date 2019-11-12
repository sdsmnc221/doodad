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

	import Pop from '../assets/popping/pop.mp3';

	const { tick } = utils;

	export default {
		name: 'Popping',
		data() {
			return {
				bounding: null,
				play: true,
				pop: new Audio(Pop)
			};
		},
		computed: {},
		created() {
			EventBus.$on('resize', this.resize.bind(this));
			EventBus.$on('toggle', this.toggle.bind(this));
			EventBus.$on('refresh', this.refresh.bind(this));
		},
		mounted() {
			tick(this.size, 1000);
			tick(this.popping, 1000);
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
			},
			popping() {
				const doodle = this.$refs['doodle'];

				if (doodle) {
					this.cells(doodle).forEach((c) => {
						const duration =
							parseFloat(
								window.getComputedStyle(c).getPropertyValue('animation-duration')
							) * 1000;

						setInterval(() => {
							this.pop.play();
						}, duration);
					});
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

		--color: black;

		/* prettier-ignore */
		--doodle: (
			:doodle {
				@grid: 20 / 100%; 
				grid-gap: 10px;
				
			} 

			position: relative;
			z-index: 1;
			background-color: #{$bg};
			border-radius: 100%;
			border: thin solid var(--color);
			box-shadow: 0px 0px 0px 0px var(--color);
					
			animation-name: pop;
			animation-direction: alternate;
			animation-iteration-count: infinite;
			animation-fill-mode: both;
			animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
			animation-duration: @r(2s);

			@keyframes pop {
				to {
					box-shadow: @r(2px) @r(2px) 0px 0px var(--color);
				}
			}
		)
		/* prettier-ignore */
	}
</style>