<script lang="ts">
	import PostList from "../components/PostList.svelte";

	export let searchquery: string = "";
</script>

<div>
	<div class="rss">
		<a href="https://rss.jonasjones.dev/blog">Susbcribe to the RSS Feed <i class="fas fa-rss"></i></a>
	</div>
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

	.rss a {
		text-decoration: none;
		color: inherit;
	}
</style>