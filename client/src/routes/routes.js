import App from '../App';
import Feed from '../components/Feed'
import Main from '../components/Main'
import Auth from './auth'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'

const routes = {
    component: App,
    childRoutes: [
        {
            path: '/',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, Feed)
                }
                else {
                    callback(null, Login)
                }
            }
        },
        {
            path: '/games',
            component: Main
        },
        {
            path: '/dashboard',
            component: Dashboard
        }
    ]
};

export default routes;