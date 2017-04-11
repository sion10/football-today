import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import GoogleAd from './GoogleAd'
import './Login.css'

class Login extends Component {
    constructor() {
        super();

        this.state = {

        }

    }

    render() {
        return (
            <div>
                <div height="20px">
                    <GoogleAd slot={'2122306133'}/>
                </div>
                <div className="bg" style={{ height: '90vh', display: 'flex', alignItems: 'center' }}>
                    <div>
                        <h1 className="display-4" >SOCIAL NETWORK FOR <br />FOOTBALL  BETTING <br />TIPS  AND PREDICTIONS</h1>
                        <RaisedButton href={'/login'} label="SignUp With Facebook" primary={true} />
                        <GoogleAd slot={'5075772536'}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login

