import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
    constructor() {
        super();

        this.state = {

        }
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin() {
        fetch('/login', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        });
    }

    render() {
        return (
            <div className="col-sm-9">
                <RaisedButton onClick={this.handleLogin} label="Login" primary={true} />
                <a href='/login'>login</a>
            </div>
        )
    }
}
export default Login

