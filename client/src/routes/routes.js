import App from '../App';
import Feed from '../components/Feed'
import Main from '../components/Main'
import Auth from './auth'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Leaderboard from '../components/Leaderboard'

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
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, Main)
                }
                else {
                    callback(null, Login)
                }
            }
        },
        {
            path: '/dashboard',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, Dashboard)
                }
                else {
                    callback(null, Login)
                }
            }
        },
        {
            path: '/leaderboard',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, Leaderboard)
                }
                else {
                    callback(null, Login)
                }
            }
        },
        {
            path: '*',
            component: Feed
        }
    ]
};

export default routes;