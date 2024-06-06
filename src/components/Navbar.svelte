<nav class="navbar">
    <ul>
        <li><a href="/#/">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
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
</style>
