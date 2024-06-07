<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let searchTerm = '';

    function handleSearch() {
      // Dispatch an event with the search term as payload
      dispatch('search', searchTerm);
    }
  </script>

<nav class="navbar">
    <ul>
        <li><a href="/#/">Home</a></li>
        <li><a href="https://jonasjones.dev/about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <input type="text" bind:value={searchTerm} />
        <button on:click={handleSearch}>Search</button>
        <a href="https://jonasjones.dev" class="sticky-link">Homepage</a>
    </ul>
</nav>

<style>
    .navbar {
        position: sticky;
        top: 0;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: center;
        width: 100%; /* Ensures ul takes full width */
    }

    li {
        display: inline;
    }

    a {
        text-decoration: none;
        color: #e2b714;
        padding: 10px 20px;
        display: block;
    }

    a:hover {
        color: #d1d0c5;
    }

    .sticky-link {
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px 20px;
        text-decoration: none;
    }

    @media (max-width: 650px) {
        .navbar {
            flex-direction: column;
        }

        .sticky-link {
            position: relative;
            padding: 10px 20px;
        }
    }

    @media (max-width: 500px) {
        .sticky-link {
            display: none;
        }
    }
</style>
