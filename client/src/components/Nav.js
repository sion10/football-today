import AppBar from 'material-ui/AppBar'
import AppBarChild from './AppBarChild'
import MediaQuery from 'react-responsive'
import Drawer from 'material-ui/Drawer'
import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import { browserHistory } from 'react-router'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleMenu = this.handleMenu.bind(this)
  }

  handleMenu() {
    this.setState({ open: !this.state.open })
  }
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 841px)'>
          <AppBar style={{ position: 'fixed' }}
            title={<div className={"container"}><AppBarChild path={this.props.path} user={this.props.user} logOut={this.props.logOut} /></div>}
            showMenuIconButton={false}
          />
        </MediaQuery>
        <MediaQuery query='(max-width: 840px)'>
          <AppBar style={{ position: 'fixed' }}
            title={<div className={"container"}><AppBarChild path={this.props.path} user={this.props.user} logOut={this.props.logOut} /></div>}
            showMenuIconButton={true}
            onLeftIconButtonTouchTap={this.handleMenu}
          />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}>
            <Menu>
              <MenuItem onTouchTap={() => browserHistory.push('/')}>Home</MenuItem>
              <MenuItem onTouchTap={() => browserHistory.push('/games')}>Games</MenuItem>
              <MenuItem onTouchTap={() => browserHistory.push('/Leaderboard')}>Leaderboard</MenuItem>
              <Divider />
              {this.props.user.name ? 
              <MenuItem onTouchTap={this.props.logOut}>Log Out</MenuItem> :
              <MenuItem onTouchTap={() => browserHistory.push('/login')}>Log In</MenuItem>
              }
            </Menu>
          </Drawer>
        </MediaQuery>

      </div>
    );
  }
}

export default Nav;

