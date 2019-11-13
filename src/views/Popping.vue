<template>
	<div class="wrapper" @resize="resize">
		<css-doodle ref="doodle" use="var(--doodle)"></css-doodle>
		<PopUp
			v-for="(line, index) in popups"
			:key="index"
			:text="line"
			:icon="icon"
			:active="isLast(index)"
		/>
	</div>
</template>

<script>
	import 'css-doodle';
	import anime from 'animejs';

	import EventBus from '../classes/EventBus';
	import utils from '../utils';

	import PopUp from '../components/Popup';

	import HeartIcon from '../assets/popping/heart.svg';
	import Depressed from '../assets/popping/depressed.mp3';
	import Pop from '../assets/popping/pop.mp3';
	import Plop from '../assets/popping/plop.mp3';
	import Snap from '../assets/popping/neck-snap.mp3';
	import Click from '../assets/popping/click.mp3';

	const { tick } = utils;

	const lyrics = [
		{
			line: `How long have you been smiling?`,
			time: 0
		},
		{
			line: `It seems like it's been too long.`,
			time: 4
		},
		{
			line: `Some days I don't feel like trying,`,
			time: 9
		},
		{
			line: `so what the fuck are you on?`,
			time: 13
		},
		{
			line: `I think too much, we drink too much.`,
			time: 20
		},
		{
			line: `Falling in love like it's just nothing.`,
			time: 25
		},
		{
			line: `I want to know where do we go,`,
			time: 29
		},
		{
			line: `when nothing's wrong.`,
			time: 33
		},
		{
			line: `'Cause all the kids are depressed,`,
			time: 36
		},
		{
			line: `nothing ever makes sense.`,
			time: 38
		},
		{
			line: `I'm not feeling alright,`,
			time: 40
		},
		{
			line: `staying up 'til sunrise`,
			time: 43
		},
		{
			line: `and hoping shit is okay,`,
			time: 45
		},
		{
			line: `pretending we know things`,
			time: 48
		},
		{
			line: `I don't know what happened.`,
			time: 50
		},
		{
			line: `My natural reaction is that we're scared.`,
			time: 52
		},
		{
			line: `So I guess we're scared.`,
			time: 62
		},
		{
			line: `But I can't really keep lying,`,
			time: 73
		},
		{
			line: `'cause I've been scared all along.`,
			time: 79
		},
		{
			line: `I'm getting sick of sleeping in`,
			time: 83
		},
		{
			line: `while all my friends are popping pills`,
			time: 86
		},
		{
			line: `and I don't think that they're wrong.`,
			time: 88
		},
		{
			line: `I think too much, we drink too much.`,
			time: 94
		},
		{
			line: `Falling apart like it's just nothing.`,
			time: 99
		},
		{
			line: `And I want to know where do we go`,
			time: 103
		},
		{
			line: `when nothing's wrong.`,
			time: 107
		},
		{
			line: `'Cause all the kids are depressed.`,
			time: 110
		},
		{
			line: `Nothing ever makes sense.`,
			time: 112
		},
		{
			line: `I'm not feeling alright,`,
			time: 113
		},
		{
			line: `staying up 'til sunrise`,
			time: 117
		},
		{
			line: `and hoping shit is okay,`,
			time: 120
		},
		{
			line: `pretending we know things`,
			time: 122
		},
		{
			line: `I don't know what happened.`,
			time: 125
		},
		{
			line: `My natural reaction is that we're scared.`,
			time: 127
		},
		{
			line: `So I guess we're scared.`,
			time: 138
		},
		{
			line: `I won't deny it 'cause you saw what it was.`,
			time: 149
		},
		{
			line: `I can't deny it if you won't give a fuck.`,
			time: 154
		},
		{
			line: `So I'll start it out.`,
			time: 159
		},
		{
			line: `You know I am so in love.`,
			time: 162
		},
		{
			line: `.`,
			time: 166
		}
	];

	export default {
		name: 'Popping',
		components: { PopUp },
		data() {
			return {
				bounding: null,
				play: true,
				song: new Audio(Depressed),
				pops: [Pop, Plop, Snap, Click].map((p) => new Audio(p)),
				popTerval: [],
				popups: []
			};
		},
		computed: {
			icon() {
				return HeartIcon;
			}
		},
		created() {
			EventBus.$on('resize', this.resize.bind(this));
			EventBus.$on('toggle', this.toggle.bind(this));
			EventBus.$on('refresh', this.refresh.bind(this));
			EventBus.$on('nav', this.popout);
		},
		mounted() {
			tick(this.size, 1000);
			tick(() => {
				this.refresh();
				this.poppin();
				this.lyrics();
			}, 2000);
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
						// this.poppin();
					} else {
						anime.set(cells, { animationPlayState: 'paused' });
						this.popout();
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
			poppin() {
				const doodle = this.$refs['doodle'];

				if (doodle) {
					this.song.volume = 1;
					this.song.play();

					this.cells(doodle).forEach((c, i) => {
						const duration =
							parseFloat(
								window.getComputedStyle(c).getPropertyValue('animation-duration')
							) * 1000;

						const interval = setInterval(() => {
							const pop = utils.sample(this.pops);
							pop.volume = Math.random() * (i % 2 === 0 ? 0.64 : 0.32);
							pop.play();
						}, duration);

						this.popTerval.push(interval);
					});
				}
			},
			popout() {
				this.song.pause();
				this.popTerval.forEach((i) => clearInterval(i));
				this.popTerval = [];
			},
			lyrics() {
				lyrics.forEach((l, i) => {
					setTimeout(() => this.popups.push(l.line), 1000 * l.time);
				});
			},
			isLast(index) {
				return index === this.popups.length - 1;
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
			overflow: visible;

			* {
				overflow: visible;
			}
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
			overflow: visible;
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
					box-shadow: @r(4px) @r(4px) 0px 0px var(--color);
					transform: scale(@r(0.8, 1.2));
				}
			}
		)
		/* prettier-ignore */
	}
</style>