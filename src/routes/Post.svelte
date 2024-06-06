<script lang="ts">
    export let params: {year?: string, month?: string, day?: string, title?: string} = {};

    if (params.year && params.month && params.day && params.title) {
        const date = new Date(`${params.year}-${params.month}-${params.day}`);
        if (isNaN(date.getTime())) {
            // the date is invalid
            // navigate to the 404 page
            // this is the same as returning { status: 404 } from load()
            location.href = '/404';
        }
    } else {
        // the URL is missing some parameters
        // navigate to the 404 page
        location.href = '/#/404';
    }
</script>

<h1>Lorem ipsum</h1>
<p>Tip: try changing the number in the URL's fragment, e.g. <code>#/lorem/4</code></p>
{#each Array(repeat) as _}
    <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed consequatur dicta, explicabo delectus, cupiditate, rem illo repellat aperiam saepe id minus ipsa. Illum libero consectetur fuga neque officia, adipisci commodi.Porro eius harum sed architecto maxime, molestiae cum ad dignissimos eum, nihil eligendi? Non quo, modi officia doloribus distinctio pariatur sed? Veniam facere beatae ipsam reprehenderit suscipit! Sequi, distinctio debitis.
    </p>
{/each}

<style>
	h1 {
		color: #008cff;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>

