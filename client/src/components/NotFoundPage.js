import React from 'react'
import { Link } from 'react-router'
import { Helmet } from 'react-helmet'

const NotFoundPage = () => {
    return (
        <div className="not-found">
            <Helmet>
                <title>{`Football Today - Page Not Found`}</title>
            </Helmet>
            <h1>404</h1>
            <h2>Page not found!</h2>
            <p>
                <Link to="/">Go back to the main page</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;