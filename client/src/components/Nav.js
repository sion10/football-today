import AppBar from 'material-ui/AppBar'
import AppBarChild from './AppBarChild'
import MediaQuery from 'react-responsive'
import Drawer from 'material-ui/Drawer'
import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import { Link, browserHistory } from 'react-router'
import Checkbox from 'material-ui/Checkbox'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleCheckPrem = this.props.gamesFuncs.handleCheckPrem
    this.handleCheckPrim = this.props.gamesFuncs.handleCheckPrim
    this.handleCheckBund = this.props.gamesFuncs.handleCheckBund
    this.handleCheckFriendly = this.props.gamesFuncs.handleCheckFriendly
    this.handleCheckWorld = this.props.gamesFuncs.handleCheckWorld
    this.getGamesByLeague = this.props.gamesFuncs.getGamesByLeague
    this.getWorldCupGames = this.props.gamesFuncs.getWorldCupGames

    this.handleMenu = this.handleMenu.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleMenu() {
    this.setState({ open: !this.state.open })
  }
  handleClose(){
    this.setState({ open:  false})
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
            onRequestChange={(open) => this.setState({ open })}
          >
            <Menu>
              <MenuItem onTouchTap={() => {
                browserHistory.push('/')
                this.handleClose()
                }}>Home</MenuItem>
              <MenuItem onTouchTap={() => {
                browserHistory.push('/games')
                this.handleClose()
                }}>Games</MenuItem>
              <MenuItem onTouchTap={() => {
                browserHistory.push('/Leaderboard')
                this.handleClose()
                }}>Leaderboard</MenuItem>
              <Divider />
              <p className="h6 col" style={{ paddingLeft: 15, paddingRight: 15 }}> LEAGUES FILTER: </p>
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label="Premier League"
                defaultChecked={true}
                onCheck={()=>{
                  this.handleCheckPrem()
                  this.handleClose()
                  }}
              />
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label="Primera Division"
                defaultChecked={false}
                onCheck={()=>{
                  this.handleCheckPrim()
                  this.handleClose()
                  }}
              />
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label="Bundesliga"
                defaultChecked={false}
                onCheck={()=>{
                  this.handleCheckBund()
                  this.handleClose()
                  }}
              />
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label="International"
                defaultChecked={false}
                onCheck={()=>{
                  this.handleCheckWorld()
                  this.handleClose()
                  }}
              />
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label="Int. Friendly"
                defaultChecked={false}
                onCheck={()=>{
                  this.handleCheckFriendly()
                  this.handleClose()
                  }}
              />
              <Divider />
              {this.props.user.name ?
                <MenuItem onTouchTap={this.props.logOut}>Log Out</MenuItem> :
                <a href='/login'><MenuItem>Log In</MenuItem></a>
              }
            </Menu>
          </Drawer>
        </MediaQuery>

      </div>
    );
  }
}

export default Nav;

