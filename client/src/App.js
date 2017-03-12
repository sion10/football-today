import React, { Component } from 'react';
import Nav from './components/Nav.js'
import Side from './components/Side.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from './routes/auth'
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tips: [],
      user:{}
    }
    this.addTip = this.addTip.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.getUser = this.getUser.bind(this)
  }
  handleClear() {
    let state = this.state
    state.tips = []
    this.setState(state)
  }
  handleSubmit() {
    fetch('http://localhost:3000/submit', {
      method: 'post',
      body: JSON.stringify(this.state.tips),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    });
  }
  addTip(item) {
    let arr = this.state.tips.slice()
    let obj = {
      eventId: item.game.gameId,
      eventName: item.game.gameName,
      categoryName: item.game.categoryName,
      eventStart: item.game.eventStart,
      betName: item.tip.name,
      betValue: item.tip.value,
      betType: '3way'
    }
    arr.push(obj)
    let state = this.state
    state.tips = arr
    this.setState(state)
  }
  componentDidMount() {
    this.getUser();
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
        }).then(checkStatus)
            .then(parseJSON)
            .then(function (data) {
                console.log(data);
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
            console.log(error); // eslint-disable-line no-console
            throw error;
        }
        function parseJSON(response) {
            return response.json();
        }
    }

  render() {
    let children = React.Children.map(this.props.children, (child) => {
      return (
        React.cloneElement(child, {
          addTip: this.addTip,
          user: this.user
        })
      )
    })
    return (
      <MuiThemeProvider>
        <div>
          <Nav path={this.props.location.pathname} user={this.state.user}/>
          <div className="container" style={{ paddingTop: "70px" }}>
            <div className="row">
              {children}
              <Side tips={this.state.tips} handleSubmit={this.handleSubmit} handleClear={this.handleClear} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

}


export default App;
