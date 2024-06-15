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
        <li><a href="/#/">Posts</a></li>
        <li><a href="https://jonasjones.dev/about">About</a></li>
        <li id="navbarsearchparent"><input id="overflownavbar" class="navbarsearch" type="text" bind:value={searchTerm} on:input={handleSearch} placeholder="Search posts..." /></li>
        <li><a href="https://jonasjones.dev">Homepage</a></li>
    </ul>
    <div id="overflownavbarsub">
        <input id="overflownacbarsubitem" class="navbarsearch" type="text" bind:value={searchTerm} on:input={handleSearch} placeholder="Search posts..." />
    </div>
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
        width: 100%;
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

    #overflownavbarsub {
        display: none;
        gap: 20px;
        justify-content: center;
    }

    .navbarsearch {
        height: 25px;
        padding: 5px;
        padding-left: 10px;
        margin-bottom: 2px;
        background-color: #303030;
        border-color: #e2b714;
        border-radius: 5px;
        border-width: 0px;
        color: #e2b714;
    }

    @media (max-width: 550px) {
        #overflownavbar {
            display: none;
        }

        #overflownavbarsub {
            display: flex;
        }

        .navbar {
            flex-direction: column;
        }

        .navbarsearch {
            width: 90%;
        }

        #navbarsearchparent {
            width: 90%;
            border-color: red;
        }
    }
</style>
