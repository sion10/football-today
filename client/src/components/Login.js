import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
    constructor() {
        super();

        this.state = {

        }

    }

    render() {
        return (
            <div className="col-sm-9 container">
                <div className="jumbotron" >
                    <h1 className="display-4" >TWITTER FOR <br/>FOOTBALL  BETTING <br/>PREDICTIONS</h1>
                    <RaisedButton href={'/login'} label="SignUp With Facebook" primary={true} />
                </div>
            </div>
        )
    }
}
export default Login

