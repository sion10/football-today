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
import G from './components/G'
import SSR from './helper'
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      games: [
        {
          matches: [],
          selected: true,
          country: 'International Clubs',
          league: 'Champions League',
          svg: '/flagsvg/fifa.svg'
        },
        {
          matches: [],
          selected: true,
          country: 'International Clubs',
          league: 'Europa League',
          svg: '/flagsvg/fifa.svg'
        },
        {
          matches: [],
          selected: true,
          country: 'England',
          league: 'Premier League',
          svg: '/flagsvg/eng.svg'
        },
        {
          matches: [],
          selected: false,
          country: 'Germany',
          league: 'Bundesliga',
          svg: '/flagsvg/de.svg'
        },
        {
          matches: [],
          selected: false,
          country: 'Spain',
          league: 'Primera Division',
          svg: '/flagsvg/esp.svg'
        },
        {
          matches: [],
          selected: false,
          country: 'International',
          league: 'World Cup',
          svg: '/flagsvg/fifa.svg'
        },
        {
          matches: [],
          selected: false,
          country: 'International',
          league: 'Friendly Matches',
          svg: '/flagsvg/fifa.svg'
        }
      ],
      open: false,
      tips: [],
      user: {},
      submitFeedback: {
        open: false,
        mssg: 'Your Tip Submitted Successfully'
      },
      snackAction: ''
    }
    this.handleCheckPrem = this.handleCheckPrem.bind(this)
    this.handleCheckEuropa = this.handleCheckEuropa.bind(this)
    this.handleCheckPrim = this.handleCheckPrim.bind(this)
    this.handleCheckBund = this.handleCheckBund.bind(this)
    this.handleCheckChamp = this.handleCheckChamp.bind(this)
    this.handleCheckFriendly = this.handleCheckFriendly.bind(this)
    this.handleCheckWorld = this.handleCheckWorld.bind(this)
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
    let state = this.state
    state.games[G['2615']].selected = !this.state.games[G['2615']].selected
    this.setState(state)
  }
  handleCheckEuropa() {
    if (!this.state.games[G['2560']].selected && !this.state.games[G['2560']].matches[0]) {
      this.getGamesByLeague('2560')
      let games = this.state.games
      games[G['2560']].selected = !games[G['2560']].slected
      this.setState({ games: games })
    }
    else {
      let state = this.state
      state.games[G['2560']].selected = !this.state.games[G['2560']].selected
      this.setState(state)
    }
  }
  handleCheckPrim() {
    if (!this.state.games[G['2553']].selected && !this.state.games[G['2553']].matches[0]) {
      this.getGamesByLeague('2553')
      let games = this.state.games
      games[G['2553']].selected = !games[G['2553']].slected
      this.setState({ games: games })
    }
    else {
      let state = this.state
      state.games[G['2553']].selected = !this.state.games[G['2553']].selected
      this.setState(state)
    }
  }
  handleCheckBund() {
    if (!this.state.games[G['2609']].selected && !this.state.games[G['2609']].matches[0]) {
      this.getGamesByLeague('2609')
      let games = this.state.games
      games[G['2609']].selected = !games[G['2609']].slected
      this.setState({ games: games })
    }
    else {
      let state = this.state
      state.games[G['2609']].selected = !this.state.games[G['2609']].selected
      this.setState(state)
    }
  }
  handleCheckChamp() {
    if (!this.state.games[G['3148']].selected && !this.state.games[G['3148']].matches[0]) {
      this.getGamesByLeague('3148')
      let games = this.state.games
      games[G['3148']].selected = !games[G['3148']].slected
      this.setState({ games: games })
    }
    else {
      let state = this.state
      state.games[G['3148']].selected = !this.state.games[G['3148']].selected
      this.setState(state)
    }
  }
  handleCheckWorld() {
    if (!this.state.games[G['96892']].selected && !this.state.games[G['96892']].matches[0]) {
      this.getWorldCupGames()
    }
    else {
      let state = this.state
      state.games[G['96892']].selected = !this.state.games[G['96892']].selected
      this.setState(state)
    }
  }
  handleCheckFriendly() {
    if (!this.state.games[G['2673']].selected && !this.state.games[G['2673']].matches[0]) {
      this.getGamesByLeague('2673')
      let games = this.state.games
      games[G['2673']].selected = !games[G['2673']].slected
      this.setState({ games: games })
    }
    else {
      let state = this.state
      state.games[G['2673']].selected = !this.state.games[G['2673']].selected
      this.setState(state)
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
        let state = this.state
        state.games[G['96892']].selected = !this.state.games[G['96892']].selected
        state.games[G['96892']].matches = data
        this.setState(state)
      })
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
    let state = this.state
    state.open = true
    this.setState(state)
  }
  handleClose() {
    let state = this.state
    state.open = false
    this.setState(state)
  }
  handleClear() {
    let state = this.state
    state.tips = []
    this.setState(state)
  }
  removeTip(index) {
    let state = this.state
    state.tips.splice(index, 1)
    this.setState(state)
  }
  onActionTouchTap() {
    let state = this.state
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
        let state = this.state
        state.submitFeedback.mssg = 'Your tip submitted Successfully'
        state.submitFeedback.open = true
        this.setState(state)
      }
      else if (response.status === 401) {
        let state = this.state
        state.submitFeedback.mssg = 'Please Log in to make prediction'
        state.snackAction = 'FB Login'
        state.submitFeedback.open = true
        this.setState(state)
      }
    });
  }
  addTip(item) {
    let state = this.state
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
        let state = self.state
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
    let state = self.state
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
    let state = this.state
    state.user = {}
    this.setState(state)
  }
  handleSubmitFeedbackClose() {
    let state = this.state
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
            handleCheckEuropa: this.handleCheckEuropa,
            handleCheckPrim: this.handleCheckPrim,
            handleCheckBund: this.handleCheckBund,
            handleCheckChamp: this.handleCheckChamp,
            handleCheckFriendly: this.handleCheckFriendly,
            handleCheckWorld: this.handleCheckWorld,
            getGamesByLeague: this.getGamesByLeague,
            getWorldCupGames: this.getWorldCupGames
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
              handleCheckEuropa: this.handleCheckEuropa,
              handleCheckPrim: this.handleCheckPrim,
              handleCheckBund: this.handleCheckBund,
              handleCheckChamp: this.handleCheckChamp,
              handleCheckFriendly: this.handleCheckFriendly,
              handleCheckWorld: this.handleCheckWorld,
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
            <img src="https://top-fwz1.mail.ru/counter?id=2812079;t=479;l=1"
              style={{border:0, height:25, width:50, alt:"Рейтинг@Mail.ru", position:'fixed', left:'92%', top: '95%'}} /></a>
          <MediaQuery query='(max-width: 840px)'>
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
