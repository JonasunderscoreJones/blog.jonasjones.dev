import Home from './routes/Home.svelte';
import NotFound from './routes/NotFound.svelte';
import Dashboard from './routes/Dashboard.svelte';
import Post from './routes/Post.svelte';

export default {
    '/': Home,
    '/post/:year/:month/:day/:title': Post,
    '/dash': Dashboard,
    '*': NotFound
};
