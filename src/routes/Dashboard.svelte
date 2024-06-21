<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const posts = writable([]);
  const selectedPost = writable({});

  let postId = "";
  let title = "";
  let author = "";
  let date = "";
  let description = "";
  let content = "";
  let password = "";
  let now = false;

  onMount(async () => {
    try {
      const response = await fetch('https://cdn.jonasjones.dev/blog/index.json');
      const data = await response.json();
      posts.set(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  });

  $: if (postId) {
    posts.subscribe(async posts => {
      const post = posts.find(p => p.id === postId);
      if (post) {
        selectedPost.set(post);
        title = post.title;
        author = post.author;
        date = new Date(post.date).toISOString().split('T')[0];
        description = post.description;
        content = await fetchPostContent(post);
      }
    });
  }

  async function fetchPostContent(post) {
    const year = new Date(post.date).getFullYear();
    const month = String(new Date(post.date).getMonth() + 1).padStart(2, '0');
    const day = String(new Date(post.date).getDate()).padStart(2, '0');
    const contentUrl = `https://cdn.jonasjones.dev/blog/posts/${year}/${month}/${day}/${post.id}.md`;

    try {
      const response = await fetch(contentUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      let content = await response.text();
      return await content.replace(/^\[.*?\]: .*$(?:\r?\n)?/gm, '');
    } catch (error) {
      console.error('Error fetching post content:', error);
      return '';
    }
  }

  async function handleSubmitUpdate(event) {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('id', postId);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('date', now ? new Date().toISOString().split('T')[0] : date);
    formData.append('description', description);
    formData.append('content', content);

    try {
      const response = await fetch('https://rss.jonasjones.dev/blog/new_post', {
        method: 'POST',
        headers: {
          'x-Custom-Auth-Key': password
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating post');
    }
    location.reload();
  }


    async function handleSubmitNew(event) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      // Get the password from the form data
      const password = formData.get('password');
      formData.delete('password');

      // If the "now" checkbox is checked, set the date to the current date
      if (formData.get('now')) {
        formData.set('date', new Date().toISOString().split('T')[0]);
        formData.delete('now');
      }

      try {
        const response = await fetch('https://rss.jonasjones.dev/blog/new_post', {
          method: 'POST',
          headers: {
            'x-Custom-Auth-Key': password
          },
          body: new URLSearchParams(formData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.json();
        console.log('Success:', result);
        alert('Post submitted successfully!');
      } catch (error) {
        console.error('Error:', error);
        alert('Error submitting post');
      }
      location.reload();
    }

    async function handleSubmitDelete(event) {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('id', postId);

    try {
      const response = await fetch('https://rss.jonasjones.dev/blog/delete_post', {
        method: 'DELETE',
        headers: {
          'x-Custom-Auth-Key': password
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Post deleted successfully!');
      // Reset form fields after deletion
      postId = "";
      title = "";
      author = "";
      date = "";
      description = "";
      content = "";
      password = "";
      now = false;
      posts.update(currentPosts => currentPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting post');
    }
    location.reload();
  }
  </script>


<h1>New Post</h1>

<form id="new-post-form" on:submit={handleSubmitNew}>
    <label for="id">ID:</label>
    <input type="text" id="id" name="id" required><br><br>

    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required><br><br>

    <label for="author">Author:</label>
    <input type="text" id="author" name="author" required><br><br>

    <label for="date">Date:</label>
    <input type="date" id="date" name="date"><br><br>

    <label for="now">Use current date:</label>
    <input type="checkbox" id="now" name="now"><br><br>

    <label for="description">Description:</label>
    <textarea id="description" name="description" required></textarea><br><br>

    <label for="content">Content:</label>
    <textarea id="content" name="content" required></textarea><br><br>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required><br><br>

    <button type="submit">Post</button>
</form>

<h1>Update Post</h1>

<form on:submit={handleSubmitUpdate}>
  <label for="post-id">Post ID:</label>
  <select id="post-id" bind:value={postId} required>
    <option value="">Select a post ID</option>
    {#each $posts as post}
      <option value={post.id}>{post.id}</option>
    {/each}
  </select><br><br>

  <label for="title">Title:</label>
  <input type="text" id="title" bind:value={title} required><br><br>

  <label for="author">Author:</label>
  <input type="text" id="author" bind:value={author} required><br><br>

  <label for="date">Date:</label>
  <input type="date" id="date" bind:value={date}><br><br>

  <label for="now">Use current date:</label>
  <input type="checkbox" id="now" bind:checked={now}><br><br>

  <label for="description">Description:</label>
  <textarea id="description" bind:value={description} required></textarea><br><br>

  <label for="content">Content:</label>
  <textarea id="content" bind:value={content} required></textarea><br><br>

  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password} required><br><br>

  <button type="submit">Update Post</button>
</form>

<h2>Delete Post</h2>
<form on:submit={handleSubmitDelete}>
  <label for="delete-post-id">Post ID:</label>
  <select id="delete-post-id" bind:value={postId} required>
    <option value="">Select a post ID</option>
    {#each $posts as post}
      <option value={post.id}>{post.id}</option>
    {/each}
  </select><br><br>

  <label for="delete-password">Password:</label>
  <input type="password" id="delete-password" bind:value={password} required><br><br>

  <button type="submit">Delete Post</button>
</form>