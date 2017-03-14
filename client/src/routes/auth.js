class Auth {
    static isUserAuthenticated() {

        if (document.cookie) {
            let token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            if (token) {
                localStorage.setItem('token', token);
            }

        }
        return localStorage.getItem('token') !== null;
    }
    static deauthenticateUser() {
        localStorage.removeItem('token');
    }
    static getToken() {
        return localStorage.getItem('token');
    }
}

export default Auth;    