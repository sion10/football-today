import React, { Component } from 'react';
import Nav from './components/Nav.js'
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }
  handleClear() {
    this.setState({
      tips: []
    })
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
    this.setState({
      tips: arr
    })
  }

  render() {
    let children = React.Children.map(this.props.children, (child) => {
      return (
        React.cloneElement(child, {
          addTip: this.addTip
        })
      )
    })
    return (
      <MuiThemeProvider>
        <div>
          <Nav />
          <div className="container" style={{paddingTop: "70px"}}>
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
