import AppBar from 'material-ui/AppBar'
import AppBarChild from './AppBarChild'
import MediaQuery from 'react-responsive'
import Drawer from 'material-ui/Drawer'
import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import { browserHistory } from 'react-router'
import Checkbox from 'material-ui/Checkbox'
import SSR from '../helper'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleCheckPrem = this.props.gamesFuncs.handleCheckPrem
    this.handleCheckEuropa = this.props.gamesFuncs.handleCheckEuropa
    this.handleCheckPrim = this.props.gamesFuncs.handleCheckPrim
    this.handleCheckBund = this.props.gamesFuncs.handleCheckBund
    this.handleCheckChamp = this.props.gamesFuncs.handleCheckChamp
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
  handleClose() {
    this.setState({ open: false })
  }
  render() {
    return (
      <div>
        {SSR ? <AppBar style={{ position: 'fixed' }}
          title={<div className={"container"}><AppBarChild path={this.props.path} user={this.props.user} logOut={this.props.logOut} /></div>}
          showMenuIconButton={false}
        /> : null}
        <MediaQuery query='(min-device-width: 1521px)'>
          <AppBar style={{ position: 'fixed' }}
            title={<div className={"container"}><AppBarChild path={this.props.path} user={this.props.user} logOut={this.props.logOut} /></div>}
            showMenuIconButton={false}
          />
        </MediaQuery>
        <MediaQuery query='(max-width: 1520px)'>
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
                browserHistory.push('/leaderboard')
                this.handleClose()
              }}>Leaderboard</MenuItem>
              <a href='https://blog.football-today.com'><MenuItem>Blog</MenuItem></a>
              <Divider />
              <p className="h6 col" style={{ paddingLeft: 15, paddingRight: 15 }}> LEAGUES FILTER: </p>
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label={this.props.games[0].league}
                defaultChecked={this.props.games[0].selected}
                onCheck={() => {
                  this.handleCheckChamp()
                  this.handleClose()
                }}
              />
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label={this.props.games[1].league}
                defaultChecked={this.props.games[1].selected}
                onCheck={() => {
                  this.handleCheckEuropa()
                  this.handleClose()
                }}
              />
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label={this.props.games[2].league}
                defaultChecked={this.props.games[2].selected}
                onCheck={() => {
                  this.handleCheckPrem()
                  this.handleClose()
                }}
              />
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label={this.props.games[3].league}
                defaultChecked={this.props.games[3].selected}
                onCheck={() => {
                  this.handleCheckBund()
                  this.handleClose()
                }}
              />
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label={this.props.games[4].league}
                defaultChecked={this.props.games[4].selected}
                onCheck={() => {
                  this.handleCheckPrim()
                  this.handleClose()
                }}
              />
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label={this.props.games[5].league}
                defaultChecked={this.props.games[5].selected}
                onCheck={() => {
                  this.handleCheckWorld()
                  this.handleClose()
                }}
              />
              <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
                label={this.props.games[6].league}
                defaultChecked={this.props.games[6].selected}
                onCheck={() => {
                  this.handleCheckFriendly()
                  this.handleClose()
                }}
              />
              <Divider />
              {this.props.user && this.props.user.name ?
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

