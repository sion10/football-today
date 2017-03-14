import React, { Component } from 'react';
import TipButton from './TipButton.js'
import Auth from '../routes/auth'

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    }
  }

  componentDidMount() {
    this.gamesList();
  }

  gamesList() {
    var self = this;
    return fetch('/api', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {
        self.setState({ games: data })
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
    const matches = this.state.games.map((item, i) => {
      let threeWay, BTS
      if (item.markets['0'].options['0']) {
        threeWay = item.markets['0'].options.map((option, x) => {
          return (
              <p key={'b' + x}>{item.markets['0'].options[x].n} : <TipButton item={item} tip={item.markets['0'].options[x]} addTip={this.props.addTip} tipType={item.markets['0'].type} /></p>
          )
        })
      }
      if (item.markets['1'].options['0']) {
        BTS = item.markets['1'].options.map((option,x) => {
          return (
              <p key={'a'+ x}>{item.markets['1'].options[x].n} : <TipButton item={item} tip={item.markets['1'].options[x]} addTip={this.props.addTip} tipType={item.markets['1'].type} /></p>
          )
        })
      }
      return (
        <div key={item._id}>
          <hr />
          <p>{item.gameName}</p>
          <p>{item.eventStart}</p>
          <p>{item.categoryName}</p>
          <p>{item.markets['0'].type}</p>
          {threeWay}
          <p>{item.markets['1'].type}</p>
          {BTS}
        </div>
      )
    })
    return (

      <div className="col-sm-9">
        {matches}
      </div>

    );
  }
}

export default Main;
