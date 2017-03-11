import React, { Component } from 'react';
import TipButton from './TipButton.js'
import Auth from '../routes/auth'

class Main extends Component {
  constructor() {
    super();

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
        //console.log(data);
        self.setState({ games: data });
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
      return (
        <div key={item._id}>
          <hr/>
          <p>{item.gameName}</p>
          <p>{item.eventStart}</p>
          <p>{item.categoryName}</p>
          <p>{item.markets['0'].type}</p>
          <p>{item.markets['0'].options['0'].name} : <TipButton item={item} tip={item.markets['0'].options['0']} addTip={this.props.addTip} /></p> 
          <p>{item.markets['0'].options['1'].name} : <TipButton item={item} tip={item.markets['0'].options['1']} addTip={this.props.addTip} /></p> 
          <p>{item.markets['0'].options['2'].name} : <TipButton item={item} tip={item.markets['0'].options['2']} addTip={this.props.addTip} /></p> 
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
