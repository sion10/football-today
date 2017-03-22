import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import './AppBarChild.css'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.path
        }
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleOnTouch = this.handleOnTouch.bind(this)
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


    render() {
        return (
            <Toolbar style={{ backgroundColor: "#00bcd4" }}>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle className='logoNamed' text="PredictX" style={{ color: "#ffffff" }} onTouchTap={this.handleOnTouch} />
                    <div className='tabsContainer'>
                    <Tabs className='tabsNamed' value={this.state.active}>
                        <Tab value="/" label="home" style={{width: '100%', paddingTop: 13, paddingBottom: 13 }} onActive={this.handleOnTouch} />
                        <Tab value="/games" label="games" style={{width: '100%', paddingTop: 13, paddingBottom: 13 }} onActive={this.handleOnClick} />
                        <Tab value="/leaderboard" label="leaderboard" style={{width: '100%', paddingTop: 13, paddingBottom: 13 }} onActive={this.handleOnClick} />
                    </Tabs>
                    </div>
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                    {this.props.user.name ? <Chip onTouchTap={this.handleTouchTap}>
                        <Avatar src={this.props.user.picture} size={30} />
                        {this.props.user.name}
                    </Chip> : null}
                    {this.props.user.name ? <FlatButton labelStyle={{color:'#ffffff'}} label="Log Out" onTouchTap={this.props.logOut} /> : <FlatButton labelStyle={{color:'#ffffff'}} href={'/login'} label="Log In"/>}
                </ToolbarGroup>
            </Toolbar>
        )
    }
}
export default Nav