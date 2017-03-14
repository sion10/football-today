import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.path
        }
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleOnTouch = this.handleOnTouch.bind(this)
        this.handleLogIn = this.handleLogIn.bind(this)
    }
    handleOnClick(e) {
        this.setState({ active: '/' + e.props.label })
        browserHistory.push('/' + e.props.label);
    }
    handleOnTouch() {
        this.setState({ active: '/' })
        browserHistory.push('/');
    }
    handleTouchTap() {
        browserHistory.push('/dashboard');
    }
    handleLogIn() {
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
            <Toolbar style={{ backgroundColor: "#00bcd4" }}>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle text="PredictX" style={{ color: "#ffffff" }} onTouchTap={this.handleOnTouch} />
                    <Tabs style={{ paddingLeft: "40px" }} value={this.state.active}>
                        <Tab value="/" label="home" style={{ padding: "13px 15px 10px 15px" }} onActive={this.handleOnTouch} />
                        <Tab value="/dashboard" label="dashboard" style={{ padding: "13px 15px 10px 15px" }} onActive={this.handleOnClick} />
                        <Tab value="/games" label="games" style={{ padding: "13px 15px 10px 15px" }} onActive={this.handleOnClick} />
                    </Tabs>
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                    {this.props.user.name ? <Chip onTouchTap={this.handleTouchTap}>
                        <Avatar src={this.props.user.picture} size={30} />
                        {this.props.user.name}
                    </Chip> : null}
                    {this.props.user.name ? <FlatButton label="Log Out" onTouchTap={this.props.logOut} /> : <FlatButton label="Log In" onTouchTap={this.handleLogIn}/>}
                </ToolbarGroup>
            </Toolbar>
        )
    }
}
export default Nav