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
      tips: ['one']
    }
    this.addTip = this.addTip.bind(this)
  }
  addTip(item) {
    let arr = this.state.tips.slice()
    arr.push(1)
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
              <Side tips={this.state.tips} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

}


export default App;
