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
                <div class="jumbotron" >
                    <h1 class="display-1" style={{marginTop:50}}>TWITTER FOR <br/>FOOTBALL  BETTING <br/>PREDICTIONS</h1>
                    <RaisedButton href={'/login'} label="SignUp With Facebook" primary={true} />
                </div>
            </div>
        )
    }
}
export default Login

