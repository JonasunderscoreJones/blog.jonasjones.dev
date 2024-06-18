<script>
    async function handleSubmit(event) {
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
    }
  </script>


<h1>New Post</h1>

<form id="new-post-form" on:submit={handleSubmit}>
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

//TODO: fix access control allow origin on actual response in worker. OPTIONS request is already fixed