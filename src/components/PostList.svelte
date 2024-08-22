<script lang="ts">
    export let query: string = "";

    import { onMount } from 'svelte';
    import Loading from './Loading.svelte';
    import NotFound from '../routes/Error.svelte';

    let posts: {id: String, date: Date, title: String, author: String, description: String}[] = [];

    let filteredPosts: {id: String, date: SimpleDate, title: String, author: String, description: String}[] = [];

    let error = false;
    let loading = true;

    let noPostMessage = '';

    class SimpleDate {
      public year: number;
      public month: number;
      public day: number;
      public datestring: string;

      constructor(dateString: string) {
          const [year, month, day] = dateString.split('-').map(Number);

          this.year = year;
          this.month = month;
          this.day = day;
          this.datestring = `${year}/${month}/${day}`;
      }

      public toUnixTimestamp(): number {
        // Create a Date object using the given year, month, and day.
        // Month is zero-based, so subtract 1 from the month.
        const date = new Date(Date.UTC(this.year, this.month - 1, this.day));

        // Get the Unix timestamp by dividing the time (in milliseconds) by 1000.
        return Math.floor(date.getTime() / 1000);
}
  }

    onMount(async () => {
        try {
            const response = await fetch('https://cdn.jonasjones.dev/blog/index.json');

            posts = await response.json();

            if (posts.length === 0) {
                loading = false;
                noPostMessage = 'No posts found :/';
                return;
            } else {

                // for each post, convert the date string to a Date object
                posts.forEach(post => {
                    post.date = new SimpleDate(post.date);
                });

                filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));

                // sort the posts by date
                filteredPosts.sort((a, b) => b.date.toUnixTimestamp() - a.date.toUnixTimestamp());
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
                    <a href="/#/post/{post.date.year}/{post.date.month}/{post.date.day}/{post.id}">
                        <h2 class="postTitle">{post.title}</h2>
                        <div class="inline">
                            <p class="postAuthor">{post.author}</p>
                            <p class="postDate">{post.date.datestring}</p>
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