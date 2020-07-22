import Login from './Login';
import Home from './Home';
import Topic from './Topic';


export const routesNames = {
    Home: 'Home',
    Login: 'Login',
    Topic: 'Topic',
};

const routes = {
    Login: {
        path: '/login',
        exact: true,
        component: Login,
    },
    Home: {
        path: '/',
        exact: true,
        privateRoute: true,
        component: Home,
    },
    Topic: {
        path: '/topic/:id',
        exact: true,
        privateRoute: true,
        component: Topic,
    },
    /*  NotFound: {
         component: NotFound,
         header: {
             hidden: true,
         },
         navigation: {
             hidden: true,
         },
 
     }, */
};

export function getRoute(routeName) {
    const route = routes[routeName];

    return route;
}

export function getPath(routeName: string, params: Array<any>) {
    const route = routes[routeName];
    if (!route) throw new Error(`No route found for name: ${routeName}`);
    if (route.path.includes(':')) {
        const routeSplitted = route.path.split('/');
        let replaceQty = 0;
        for (let i = 0; i < routeSplitted.length; i += 1) {
            if (routeSplitted[i].includes(':')) {
                routeSplitted[i] = params[replaceQty];
                replaceQty += 1;
            }
        }
        return routeSplitted.join('/');
    }
    return route.path;
}

export default {
    routesNames,
    getRoute,
    getPath,
};
