<script>
    export let visible = true;
</script>

<style>
    .title-parent {
        background-color: black;
        padding: 25px 0;
    }
    .title {
        transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
        transform: translateY(0);
        opacity: 1;
        font-family: 'Tiny5';
        color: #e2b714;
        background-color: black;
    }

    #titleh1 {
        text-align: center;
        font-family: 'Pixelify Sans';
        color: #e2b714;
        margin: 0;
        width: 90%;
        margin: 0 auto;
        font-size: 5vw
    }
</style>
<main>
    <div class="title-parent">
        <div class:title={!visible ? 'hidden' : ''}>
            <h1 id="titleh1">blog.jonasjones.dev</h1>
        </div>
    </div>
</main>

