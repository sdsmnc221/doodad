<template>
	<div class="overlay"></div>
</template>

<script>
	export default {
		name: 'LoadingOverlay'
	};
</script>

<style lang="scss" scoped>
	@import '../../styles/theme';

	.overlay {
		@include size(60%, 100%);
		position: absolute;
		top: 0;
		right: 0;
		pointer-events: none;
		background-color: $bg;
	}
</style>
