<script lang="ts">
    import { onMount } from "svelte";
    import { marked } from 'marked';

    export let params: {year?: string, month?: string, day?: string, title?: string} = {};

    let posts: { id: any; }[] = [];
    let post: {id: String, date: String, title: String, author: String, description: String} = {};

    if (params.year && params.month && params.day && params.title) {
        const searchdate = new Date(`${params.year}-${params.month}-${params.day}`);
    } else {
        // the URL is missing some parameters
        // navigate to the 404 page
        location.href = '/#/404';
    }

    onMount(async () => {
    try {
      const response = await fetch('https://cdn.jonasjones.dev/blog/index.json');

      posts = await response.json();

      post = await findPostByDate(posts, params);

      if (await post === undefined) {
        location.href = '/#/404'
      }

      const content = await fetch(`https://cdn.jonasjones.dev/blog/posts/${params.year}/${params.month}/${params.day}/${params.title}.md`)

      if (await content.ok) {
        let markdowncontent = await content.text();
        markdowncontent = await marked.parse(markdowncontent);
        document.getElementById('markdowncontent').innerHTML = await markdowncontent;
      }

    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  });

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

<p>{params.year}, {params.month}, {params.day}, {params.title}</p>

<div class="post">
    <h1>{post.title}</h1>
    <h3>{post.description}</h3>
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

