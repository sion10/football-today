import React, { Component } from 'react';
import Nav from './components/Nav.js'
import Side from './components/Side.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from './routes/auth'
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import moment from 'moment'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import MediaQuery from 'react-responsive'
import { BottomSheet } from 'material-ui-bottom-sheet'
import IconButton from 'material-ui/IconButton';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import G from './data/G'
import SSR from './helper'
import gamesData from './data/games'
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      games: gamesData,
      open: false,
      tips: [],
      user: {},
      submitFeedback: {
        open: false,
        mssg: 'Your Tip Submitted Successfully'
      },
      snackAction: ''
    }

    this.handleCheckLeague = this.handleCheckLeague.bind(this)
    this.handleCheckPrem = this.handleCheckPrem.bind(this)
    this.gamesList = this.gamesList.bind(this)
    this.getGamesByLeague = this.getGamesByLeague.bind(this)
    this.getWorldCupGames = this.getWorldCupGames.bind(this)

    this.addTip = this.addTip.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.getUser = this.getUser.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleSubmitFeedbackClose = this.handleSubmitFeedbackClose.bind(this)
    this.isValid = this.isValid.bind(this)
    this.removeTip = this.removeTip.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onActionTouchTap = this.onActionTouchTap.bind(this)
  }

  handleCheckPrem() {
    let games = this.state.games.slice()
    games[G['2615']].selected = !games[G['2615']].selected
    this.setState({ games: games })
  }
  handleCheckLeague(id) {
    if (!this.state.games[G[id]].selected && !this.state.games[G[id]].matches[0]) {
      this.getGamesByLeague(id)
      let games = this.state.games.slice()
      games[G[id]].selected = !games[G[id]].selected
      this.setState({ games: games })
    }
    else {
      let games = this.state.games.slice()
      games[G[id]].selected = !games[G[id]].selected
      this.setState({ games: games })
    }
  }

getWorldCupGames() {
  fetch('/api/getworld', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    }
  }).then(this.checkStatus)
    .then(this.parseJSON)
    .then((data) => {
      let games = this.state.games.slice()
      games[G['96892']].selected = !games[G['96892']].selected
      games[G['96892']].matches = data
      this.setState({ games: games })
    })
}
gamesList() {
  return fetch('/api', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    }
  }).then(this.checkStatus)
    .then(this.parseJSON)
    .then((data) => {
      let games = this.state.games.slice()
      games[G['2615']].matches = data
      this.setState({ games: games })
    });
}
getGamesByLeague(league) {
  fetch('/api/getleague', {
    method: 'POST',
    body: JSON.stringify({
      id: league
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    }
  }).then(this.checkStatus)
    .then(this.parseJSON)
    .then((data) => {
      let state = this.state
      state.games[G[league]].matches = data
      this.setState(state)
    })
}

handleOpen() {
  let state = Object.assign({}, this.state)
  state.open = true
  this.setState(state)
}
handleClose() {
  let state = Object.assign({}, this.state)
  state.open = false
  this.setState(state)
}
handleClear() {
  let state = Object.assign({}, this.state)
  state.tips = []
  this.setState(state)
}
removeTip(index) {
  let state = Object.assign({}, this.state)
  state.tips.splice(index, 1)
  this.setState(state)
}
onActionTouchTap() {
  let state = Object.assign({}, this.state)
  state.open = false
  this.setState(state)
  SSR ? null : document.location.href = '/login'
}
isValid(match) {
  for (let i = 0; i < this.state.tips.length; i++) {
    if (this.state.tips[i].eventId === match.game.gameId && this.state.tips[i].betConflict === match.market.conflict) {
      return `Tip can not be combined with other games`
    }
  }
  return moment(match.game.eventStart).isAfter(moment()) ? true : 'The game has already started'
}
handleSubmit() {
  fetch('/submit', {
    method: 'POST',
    body: JSON.stringify({
      tips: this.state.tips,
      user: this.state.user
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    }
  }).then((response) => {
    if (response.status === 200) {
      this.handleClear()
      let state = Object.assign({}, this.state)
      state.submitFeedback.mssg = 'Your tip submitted Successfully'
      state.submitFeedback.open = true
      this.setState(state)
    }
    else if (response.status === 401) {
      let state = Object.assign({}, this.state)
      state.submitFeedback.mssg = 'Please Log in to make prediction'
      state.snackAction = 'FB Login'
      state.submitFeedback.open = true
      this.setState(state)
    }
  });
}
addTip(item) {
  let state = Object.assign({}, this.state)
  if (typeof this.isValid(item) === 'string') {
    state.submitFeedback.open = true
    state.submitFeedback.mssg = this.isValid(item)
    this.setState(state)
    return
  }
  let arr = this.state.tips.slice()
  let obj = {
    eventId: item.game.gameId,
    eventName: item.game.gameName,
    categoryName: item.game.categoryName,
    eventStart: item.game.eventStart,
    betName: item.tip.n,
    betValue: item.tip.v,
    betType: item.market.type,
    betConflict: item.market.conflict
  }
  arr.push(obj)
  state.tips = arr
  this.setState(state)
}
componentDidMount() {
  Auth.isUserAuthenticated() ? this.getUser() : null
}
getUser() {
  let self = this
  return fetch('api/user', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    }
  }).then(this.checkStatus.bind(self))
    .then(this.parseJSON)
    .then(function (data) {
      let state = Object.assign({}, self.state)
      state.user = data
      self.setState(state);
    });
}
checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  let self = this
  let state = Object.assign({}, self.state)
  state.user = {}
  self.setState(state)
  Auth.deauthenticateUser()
  console.log(error); // eslint-disable-line no-console
  throw error;
}
parseJSON(response) {
  return response.json();
}
handleLogOut() {
  Auth.deauthenticateUser()
  browserHistory.push('/');
  let state = Object.assign({}, this.state)
  state.user = {}
  this.setState(state)
}
handleSubmitFeedbackClose() {
  let state = Object.assign({}, this.state)
  state.submitFeedback.open = false
  this.setState(state)
}

render() {
  let children = React.Children.map(this.props.children, (child) => {
    return (
      React.cloneElement(child, {
        games: this.state.games,
        gamesFuncs: {
          handleCheckPrem: this.handleCheckPrem,
          handleCheckLeague: this.handleCheckLeague,
          getGamesByLeague: this.getGamesByLeague,
          getWorldCupGames: this.getWorldCupGames,
          gamesList: this.gamesList
        },
        addTip: this.addTip,
        user: this.state.user,
        tips: this.state.tips,
        handleSubmit: this.handleSubmit,
        handleClear: this.handleClear,
        removeTip: this.removeTip
      })
    )
  })
  return (
    <MuiThemeProvider>
      <div>
        <Nav
          games={this.state.games}
          gamesFuncs={{
            handleCheckPrem: this.handleCheckPrem,
            handleCheckLeague: this.handleCheckLeague,
            getGamesByLeague: this.getGamesByLeague,
            getWorldCupGames: this.getWorldCupGames
          }}
          path={this.props.location.pathname} user={this.state.user} logOut={this.handleLogOut} />
        <div className="container" style={{ paddingTop: "70px" }}>
          {children}
          <Snackbar className="snackbar"
            action={this.state.snackAction}
            onActionTouchTap={this.onActionTouchTap}
            open={this.state.submitFeedback.open}
            message={this.state.submitFeedback.mssg}
            autoHideDuration={4000}
            onRequestClose={this.handleSubmitFeedbackClose}
          />
        </div>
        <a href="https://top.mail.ru/jump?from=2812079" rel="nofollow">
          <img alt='mail.ru counter' src="https://top-fwz1.mail.ru/counter?id=2812079;t=479;l=1"
            style={{ border: 0, height: 25, width: 50, alt: "Рейтинг@Mail.ru", position: 'fixed', left: '92%', top: '95%' }} /></a>
        <MediaQuery query='(max-width: 1520px)'>
          {this.state.tips[0] ?
            <Toolbar
              style={{
                zIndex: 1200,
                position: 'fixed',
                bottom: 0,
                width: '100%',
                justifyContent: 'space-between'
              }}>
              <ToolbarGroup firstChild={true}>
                <div style={{ marginLeft: 24 }}>{this.state.tips.length} {this.state.tips.length === 1 ? 'tip' : 'tips'}</div>
              </ToolbarGroup>
              <ToolbarGroup>
                Show TipSlip
                    <IconButton onTouchTap={this.handleOpen} tooltip="Expand">
                  <ArrowUp />
                </IconButton>
              </ToolbarGroup>
            </Toolbar> : null}
        </MediaQuery>
        <BottomSheet
          bodyStyle={{ background: 'e8e8e8', display: 'flex', maxHeight: '100%', overflowY: 'auto' }}
          contentStyle={{ flex: 1 }}
          onRequestClose={this.handleClose}
          open={this.state.open}
        >
          <Toolbar
            style={{
              width: '100%',
              justifyContent: 'flex-end'
            }}>
            <ToolbarGroup firstChild={true}>
              Collapse TipSlip
                <IconButton onTouchTap={this.handleClose} tooltip="Collapse">
                <ArrowDown />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
          <Side tips={this.state.tips} handleSubmit={this.handleSubmit} handleClear={this.handleClear} removeTip={this.removeTip} />
        </BottomSheet>
      </div>
    </MuiThemeProvider>
  );
}
}

export default App;
