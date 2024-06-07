<script>
	import Router from 'svelte-spa-router';
	import routes from './routes';
    import Title from './components/Title.svelte';
    import Navbar from './components/Navbar.svelte';
	import Footer from './components/Footer.svelte';

	import { onMount } from 'svelte';

	let showTitle = true;

	function handleScroll() {
        if (window.scrollY > 50) {
            showTitle = false;
        } else {
            showTitle = true;
        }
    }

	onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

	let searchValue = '';

	function handleSearch(event) {
		// Update the searchValue with the value received from the child component
		searchValue = event.detail;
	}
</script>

<Title visible={showTitle} />
<Navbar on:search={handleSearch} />

<main>
	<div class="content">
		<Router {routes} />
		<p>Search Value: {searchValue}</p>
	</div>
</main>

<footer>
	<Footer />
</footer>

<style>

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
