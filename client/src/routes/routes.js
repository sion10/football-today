import App from '../App';
import Feed from '../components/Feed'
import Main from '../components/Main'
import Auth from './auth'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Leaderboard from '../components/Leaderboard'
import { browserHistory } from 'react-router'

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
                    browserHistory.push('/login')
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
                    browserHistory.push('/login')
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
                    browserHistory.push('/login')
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
                    browserHistory.push('/login')
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