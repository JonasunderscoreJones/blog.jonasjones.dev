<script lang="ts">
    export let query: string = "";

    import { onMount } from 'svelte';
    import Loading from './Loading.svelte';
    import NotFound from '../routes/Error.svelte';

    let posts: {id: String, date: Date, title: String, author: String, description: String}[] = [];

    let filteredPosts: {id: String, date: Date, title: String, author: String, description: String}[] = [];

    let error = false;
    let loading = true;

    let noPostMessage = '';

    onMount(async () => {
        try {
            const response = await fetch('https://cdn.jonasjones.dev/blog/index.json');

            posts = await response.json();

            if (posts.length === 0) {
                loading = false;
                noPostMessage = 'No posts found :/';
                return;
            } else {

                // for each post, conver the date string to a Date object
                posts.forEach(post => {
                    post.date = new Date(post.date);
                });

                filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));

                // sort the posts by date
                filteredPosts.sort((a, b) => b.date - a.date);
                loading = false;
            }
        } catch (error) {
            console.error(error);
            error = true;
            loading = false;
        }
    });
</script>

{#if loading}
    <Loading />
{:else}
    {#if error}
        <NotFound />
    {:else}
    <h2 style="text-align: center;">{noPostMessage}</h2>
        <div class="postList">
            {#each filteredPosts as post}
                <div class="postDiv">
                    <a href="/#/post/{post.date.getFullYear()}/{post.date.getMonth() + 1}/{post.date.getDate()}/{post.id}">
                        <h2 class="postTitle">{post.title}</h2>
                        <div class="inline">
                            <p class="postAuthor">{post.author}</p>
                            <p class="postDate">{post.date.toLocaleDateString()}</p>
                        </div>
                        <p class="postDescription">{post.description}</p>
                    </a>
                </div>
            {/each}
            </div>
    {/if}
{/if}


<style>
    .postList {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 25px;
    }
    .postDiv {
      border-bottom: 3px solid #e2b714;
      padding: 16px;
      margin: 8px;
      border-radius: 8px;
      flex: 1 1 500px; /* Flex-grow, flex-shrink, flex-basis */
      box-sizing: border-box;
      text-align: center;
    }
    .postDiv:hover {
        background-color: #555;
    }
    .postDiv a {
      text-decoration: none;
      color: inherit;
    }
    .postTitle {
      font-weight: bold;
      font-size: 1.5em;
      margin-bottom: 8px;
    }
    .postAuthor, .postDate {
      font-size: 0.9em;
      color: #555;
    }
    .postDescription {
      margin-top: 8px;
    }
    .postDiv:hover .postAuthor, .postDiv:hover .postDate {
      color: #333;
    }
    .inline {
      display: flex;
      justify-content:space-around;
    }
  </style>