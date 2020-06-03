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
        path: '/topic',
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

export default {
    routesNames,
    getRoute,
};
