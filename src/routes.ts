import Home from './routes/Home.svelte';
import Post from './routes/Post.svelte';
import NotFound from './routes/NotFound.svelte';

export default {
    '/': Home,
    '/post/:year/:month/:day/:title': Post,
    '*': NotFound
};
