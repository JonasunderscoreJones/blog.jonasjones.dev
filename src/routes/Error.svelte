<script lang="ts">
	export let errorCode: {status: number, message: string} = {status: 404, message: "Not Found"};

	import { onMount } from 'svelte';
	import { recordRequest } from './analytics';

	onMount(() => {
		recordRequest();
	});
</script>

<div id="error">
	<h1 id="code">{errorCode.status}</h1>
	<h1 id="msg">{errorCode.message}</h1>
	<p>This post doesn't exist or has been deleted.</p>
</div>


<style>
	#error {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;

	}
	#code {
		font-family: 'Pixelify Sans';
		font-size: 7em;
		font-weight: 400;
		margin-bottom: 0;
	}

	#msg {
		margin-top: 0;
		font-family: 'Libre Barcode 128';
		font-size: 5em;
		font-weight: 400;
	}
</style>
