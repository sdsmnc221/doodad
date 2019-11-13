<template>
	<div :class="{ popup: true, active: active }">
		<p v-html="html"></p>
		<img v-if="hasIcon" :src="icon" alt />
	</div>
</template>

<script>
	import utils from '../../utils';
	export default {
		name: 'PopUp',
		props: {
			text: {
				type: String,
				required: true
			},
			active: {
				type: Boolean,
				required: true
			},
			icon: {
				type: String,
				required: false,
				default: ''
			}
		},
		computed: {
			html() {
				return this.text
					.split(' ')
					.map((w, i) => `<span class="word--${i % 3}">${w}</span>`)
					.join(' ');
			},
			hasIcon() {
				return this.icon !== '';
			}
		},
		mounted() {
			this.$el.style.setProperty('--top', `${utils.randomNumberInRange(20, 80)}%`);
			this.$el.style.setProperty('--left', `${utils.randomNumberInRange(20, 80)}%`);
		}
	};
</script>

<style lang="scss">
	@import '../../styles/theme';

	.popup {
		--top: 50%;
		--left: 50%;

		max-width: 60%;
		position: absolute;
		top: var(--top);
		left: var(--left);
		transform: translate(calc(var(--top) * -1), calc(var(--left) * -1));
		padding: 16px;
		color: var(--color);
		border: thin solid var(--color);
		border-top-width: 1.2rem;
		background-color: $bg;
		font-size: 0.8rem;
		text-align: center;
		opacity: 0.6;
		filter: blur(0.4px);

		&.active {
			opacity: 1;
			filter: blur(0);
		}

		img {
			display: block;
			@include abs-pos(-1rem, 0.2rem);
			@include size(0.6rem, 0.6rem);
			filter: invert(1);
		}

		span.word-- {
			&#{0} {
				font-weight: 300;
			}
			&#{1} {
				font-weight: 500;
			}
			&#{2} {
				font-weight: 900;
			}
		}
	}
</style>
