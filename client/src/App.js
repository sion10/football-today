import React, { Component } from 'react';
import Nav from './components/Nav.js'
import Main from './components/Main.js'
import Side from './components/Side.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tips: []
    }
    this.addTip = this.addTip.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  handleOnClick() {
    console.log("init req")
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
      betId: item.tip.v
    }
    arr.push(obj)
    this.setState({
      tips: arr
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Nav />
          <div className="container">
            <div className="row">
              <Main addTip={this.addTip} />
              <Side tips={this.state.tips} handleOnClick={this.handleOnClick} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

}


export default App;
