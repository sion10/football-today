import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './Login.css'

class Login extends Component {
    constructor() {
        super();

        this.state = {

        }

    }

    render() {
        return (

            <div className="bg" style={{height: '90vh', display:'flex', alignItems: 'center'}}>
                <div>
                    <h1 className="display-4" >TWITTER FOR <br />FOOTBALL  BETTING <br />PREDICTIONS</h1>
                    <RaisedButton href={'/login'} label="SignUp With Facebook" primary={true} />
                </div>
            </div>
        )
    }
}
export default Login

