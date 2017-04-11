import App from '../App';
import Feed from '../components/Feed'
import Main from '../components/Main'
import Auth from './auth'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Profile from '../components/Profile'
import Leaderboard from '../components/Leaderboard'
import { browserHistory } from 'react-router'
import NotFoundPage from '../components/NotFoundPage'

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
            path: '/profile/:id',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, Profile)
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
            component: NotFoundPage
        }
    ]
};

export default routes;