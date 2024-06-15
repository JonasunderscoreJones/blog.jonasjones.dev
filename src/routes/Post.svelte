<script lang="ts">
    import { onMount } from "svelte";
    import { marked } from 'marked';
    import Loading from './Loading.svelte';
    import NotFound from "./NotFound.svelte";
    import navigate from 'svelte-spa-router';

    export let params: {year?: string, month?: string, day?: string, title?: string} = {};

    let posts: { id: any; }[] = [];
    let post: {id: String, date: String, title: String, author: String, description: String} = {};

    let postTitle = "";
    let postDescription = "";

    let loading = true;
    let error404 = false;
    let thisHref = location.href;

    if (params.year && params.month && params.day && params.title) {
        const searchdate = new Date(`${params.year}-${params.month}-${params.day}`);
    } else {
      loading = false
      error404 = true
    }

    onMount(async () => {
      redirectUrl()
    try {
      const response = await fetch('https://cdn.jonasjones.dev/blog/index.json');

      posts = await response.json();

      post = await findPostByDate(posts, params);

      if (await !post) {
        loading = false;
        error404 = true;
      }

      if (params.month?.toString().length === 1) {
        params.month = "0" + params.month
      }
      if (params.day?.toString().length === 1) {
        params.day = "0" + params.day
      }

      const content = await fetch(`https://cdn.jonasjones.dev/blog/posts/${params.year}/${params.month}/${params.day}/${params.title}.md`)

      if (await content.ok) {
        let markdowncontent = await content.text();
        markdowncontent = await marked.parse(removePostVars(markdowncontent));
        document.getElementById('markdowncontent').innerHTML = await markdowncontent;
        loading = false;
        postTitle = post.title;
        postDescription = post.description;
      } else {
        loading = false
        error404 = true
      }

    } catch (error) {
      console.error('Error fetching posts:', error);
      loading = false
      error404 = true

    }

    function removePostVars(content: string) {
      // with regex if the line begins with a markdown variable declaration, remove it
        return content.replace(/^\[.*?\]: .*$(?:\r?\n)?/gm, '');
    }
  });

  async function redirectUrl() {
    while (true) {
        if (thisHref != location.href) {
          location.reload()
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

  function findPostByDate(posts: any[], params: { year: any; month: any; day: any; title: any; }) {
    return posts.find(post => {
        // Create a Date object from the post's date string
        const postDate = new Date(post.date);

        // Extract the year, month, and day from the Date object
        const postYear = postDate.getFullYear();
        const postMonth = postDate.getMonth() + 1; // Months are zero-based
        const postDay = postDate.getDate();

        // Compare the extracted year, month, and day with params, and the title
        return (
            postYear === parseInt(params.year) &&
            postMonth === parseInt(params.month) &&
            postDay === parseInt(params.day) &&
            post.id === params.title
        );
    });
}

</script>
{#if loading}
<Loading />
{/if}

{#if error404}
<NotFound />
{/if}

<div class="post">
    <h1>{postTitle}</h1>
    <h3>{postDescription}</h3>
    <div id="markdowncontent"></div>
</div>


<style>
	h1 {
		color: #008cff;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>

