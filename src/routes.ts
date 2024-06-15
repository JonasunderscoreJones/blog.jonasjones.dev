import Home from './routes/Home.svelte';
import Loading from './routes/Loading.svelte';
import NotFound from './routes/NotFound.svelte';
import wrap from 'svelte-spa-router/wrap';
import Dashboard from './routes/Dashboard.svelte';

export default {
    '/': Home,
    '/post/:year/:month/:day/:title': wrap({
        // Note that this is a function that returns the import
        asyncComponent: () => import('./routes/Post.svelte'),
        // Show the loading component while the component is being downloaded
        loadingComponent: Loading,
        // Pass values for the `params` prop of the loading component
        loadingParams: {
            message: 'Loading the Name route…'
        }
    }),
    '/dash': Dashboard,
    '*': NotFound
};
