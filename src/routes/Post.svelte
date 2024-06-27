<script lang="ts">
    import { onMount } from "svelte";
    import { marked } from 'marked';
    import Loading from '../components/Loading.svelte';
    import NotFound from "./Error.svelte";
    import navigate from 'svelte-spa-router';

    export let params: {year: string, month: string, day: string, title: string} = {
         year: "",
         month: "",
         day: "",
         title: ""
     };

    let posts: { id: any; }[] = [];
    let post: {id: string, date: string, title: string, author: string, description: string} = {
        id: '',
        date: '',
        title: '',
        author: '',
        description: ''
    };

    let postTitle = "";
    let postAuthor = "";
    let postDate = "";

    let loading = true;
    let error404 = false;
    let thisHref = location.href;

    let clickText = "Copy Link";

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
        const markdowncontentElement = document.getElementById('markdowncontent');
        if (markdowncontentElement) {
            markdowncontentElement.style.display = "none";
        }
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
        console.log("MarkdownContent: " + markdowncontent);
        markdowncontent = await marked.parse(removePostVars(markdowncontent));
        const markdowncontentElement = document.getElementById('markdowncontent');
        if (markdowncontentElement) {
            markdowncontentElement.innerHTML = await markdowncontent;
        }
        loading = false;
        postTitle = post.title;
        postAuthor = post.author;
        postDate = post.date;
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
          console.log("reloading")
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

function copyLink() {
    navigator.clipboard.writeText(location.href).then(() => {
        clickText = "Copied!";
        setTimeout(() => {
            clickText = "Copy Link";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
  }

</script>
{#if loading}
<Loading />
{:else}
  {#if error404}
  <NotFound />
  {:else}
  <div class="post">
    <p class="postHead">by</p>
    <h3 class="postHead">{postAuthor}</h3>
    <p class="postHead postDate">{postDate}</p>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="copy-link" on:click={copyLink}>
      <i class="fas fa-link"></i>
      <span>{clickText}</span>
    </div>
    <h1 class="postHead">{postTitle}</h1>
  </div>
  {/if}
{/if}

<div class="post" id="markdowncontent"></div>


<style>
	h1.postHead {
		text-transform: uppercase;
    font-family: 'Libre Barcode 128', sans-serif;
    font-size: 5em;
    margin-top: 0;
	}

  h3.postHead {
    font-family: 'Pixelify Sans', sans-serif;
    font-size: 1.7em;
    margin-bottom: 0;
  }
  p.postHead {
    font-family: 'Pixelify Sans', sans-serif;
    font-size: 1.5em;
    margin-bottom: 0;
  }

  p.postDate {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.3em;
  }

  p.postHead, h3.postHead {
    display: inline-block;
    padding: 0 5px;
    color: gray;
  }

  .copy-link {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            font-size: 1em;
        }
        .copy-link span {
            margin-left: 8px;
            font-size: 16px;
        }
</style>

