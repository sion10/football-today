import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

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
    handleTouchTap(){
        browserHistory.push('/Dashboard');
    }

    render() {
        return (
            <Toolbar style={{ backgroundColor: "#00bcd4" }}>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle text="PredictX" style={{ color: "#ffffff" }} onTouchTap={this.handleOnTouch} />
                    <Tabs style={{ paddingLeft: "40px" }} value={this.state.active}>
                        <Tab value="/" label="Home" style={{ padding: "13px 15px 10px 15px" }} onActive={this.handleOnTouch} />
                        <Tab value="/Dashboard" label="Dashboard" style={{ padding: "13px 15px 10px 15px" }} onActive={this.handleOnClick} />
                        <Tab value="/Games" label="Games" style={{ padding: "13px 15px 10px 15px" }} onActive={this.handleOnClick} />
                    </Tabs>
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>

                    <Chip onTouchTap={this.handleTouchTap}>
                        <Avatar src={this.props.user.picture} size={30} />
                        {this.props.user.name}
                    </Chip>

                </ToolbarGroup>
            </Toolbar>
        )
    }
}
export default Nav