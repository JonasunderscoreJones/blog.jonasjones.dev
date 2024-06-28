<script lang="ts">
    import { onMount } from "svelte";
    import { marked } from 'marked';
    import Loading from '../components/Loading.svelte';
    import NotFound from "./Error.svelte";
    import navigate from 'svelte-spa-router';
    import { parse } from "svelte/compiler";

    export let params: {year: string, month: string, day: string, title: string} = {
         year: "",
         month: "",
         day: "",
         title: ""
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

      if (params.month?.toString().length === 1) {
        params.month = "0" + params.month
      }
      if (params.day?.toString().length === 1) {
        params.day = "0" + params.day
      }

      const content = await fetch(`https://cdn.jonasjones.dev/blog/posts/${params.year}/${params.month}/${params.day}/${params.title}.md`)

      if (await content.ok) {
        let markdowncontent = await content.text();
        const parsedContent = removeAndParsePostVars(markdowncontent);
        markdowncontent = await marked.parse(parsedContent[0]);
        const markdowncontentElement = document.getElementById('markdowncontent');
        if (markdowncontentElement) {
            markdowncontentElement.innerHTML = await markdowncontent;
        }
        loading = false;
        postTitle = parsedContent[1];
        postAuthor = parsedContent[2];
        postDate = parsedContent[3];

      } else {
        loading = false
        error404 = true
      }

    } catch (error) {
      console.error('Error fetching posts:', error);
      loading = false
      error404 = true

    }

    function extractMarkdownValue(content: string, key: string) {
      const match = content.match(new RegExp(`^\\[${key}\\]: (.*)$`, 'm'));
      return match ? match[1] : '';
    }

    function removeAndParsePostVars(content: string) {
      const title = extractMarkdownValue(content, 'title');
      const author = extractMarkdownValue(content, 'author');
      const date = extractMarkdownValue(content, 'date');
      const description = extractMarkdownValue(content, 'description');

      // with regex if the line begins with a markdown variable declaration, remove it
        return [content.replace(/^\[.*?\]: .*$(?:\r?\n)?/gm, ''), title, author, date, description];
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

