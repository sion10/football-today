import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';

class Nav extends Component {
    constructor() {
        super();
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleOnTouch = this.handleOnTouch.bind(this)
    }
    handleOnClick(e) {
       browserHistory.push('/' + e.props.label);
    }
    handleOnTouch(){
         
         browserHistory.push('/');
    }


    render() {
        return (
            <Toolbar style={{ backgroundColor: "#00bcd4" }}>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle text="PredictX" style={{ color: "#ffffff" }} onTouchTap={this.handleOnTouch} />
                    <Tabs style={{ paddingLeft: "20px" }}>
                        <Tab label="Games" style={{ padding: "13px 10px 10px 10px" }} onActive={this.handleOnClick} />
                        <Tab label="Dashboard" style={{ padding: "13px 10px 10px 10px" }} onActive={this.handleOnClick} />
                    </Tabs>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}
export default Nav