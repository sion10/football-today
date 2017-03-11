class Auth {
    static isUserAuthenticated() {
        if(document.cookie){
            let token = document.cookie
            localStorage.setItem('token', token);
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