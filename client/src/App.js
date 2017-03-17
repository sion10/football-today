import React, { Component } from 'react';
import Nav from './components/Nav.js'
import Side from './components/Side.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from './routes/auth'
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import moment from 'moment'
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      tips: [],
      user: {},
      submitFeedback: {
        open: false,
        mssg: 'Your Tip Submitted Successfully'
      }
    }
    this.addTip = this.addTip.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.getUser = this.getUser.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleSubmitFeedbackClose = this.handleSubmitFeedbackClose.bind(this)
    this.isValid = this.isValid.bind(this)
  }
  handleClear() {
    let state = this.state
    state.tips = []
    this.setState(state)
  }
  isValid(match) {
    for (let i = 0; i < this.state.tips.length; i++) {
      if (this.state.tips[i].eventId === match.game.gameId && this.state.tips[i].betConflict === match.market.conflict) {
        return `Tip can not be combined with other games`
      }
    }
    return moment(match.game.eventStart).isAfter(moment())?true:'The game has already started'
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
        state.submitFeedback.open = true
        this.setState(state)
      }
    });
  }
  addTip(item) {
    let state = this.state
    if (typeof this.isValid(item) === 'string' ) {
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
    }).then(checkStatus.bind(self))
      .then(parseJSON)
      .then(function (data) {
        let state = self.state
        state.user = data
        self.setState(state);
      });


    function checkStatus(response) {
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
    function parseJSON(response) {
      return response.json();
    }
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
          addTip: this.addTip,
          user: this.state.user
        })
      )
    })
    return (
      <MuiThemeProvider>
        <div>
          <Nav path={this.props.location.pathname} user={this.state.user} logOut={this.handleLogOut} />
          <div className="container" style={{ paddingTop: "70px" }}>
            <div className="row">
              {children}
              <Side tips={this.state.tips} handleSubmit={this.handleSubmit} handleClear={this.handleClear} />
              <Snackbar
                open={this.state.submitFeedback.open}
                message={this.state.submitFeedback.mssg}
                autoHideDuration={4000}
                onRequestClose={this.handleSubmitFeedbackClose}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

}


export default App;
