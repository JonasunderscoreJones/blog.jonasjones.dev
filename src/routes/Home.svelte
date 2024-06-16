<script lang="ts">
	import PostList from "../components/PostList.svelte";

	export let searchquery: string = "";
</script>

<div>
	<h1>--- Latest Blog Posts ---</h1>
</div>

<PostList query={searchquery} />

<style>
	h1 {
		font-family: 'JetBrains Mono', monospace;
		font-size: 2em;
		margin-top: 50px;
		text-align: center;
	}
</style>