import React, { Component } from 'react';
import TipButton from './TipButton.js'
import Auth from '../routes/auth'
import moment from 'moment'

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
      let threeWay, BTS, total, double
      if (item.markets['0'].options['0']) {
        threeWay = item.markets['0'].options.map((option, x) => {
          return (
            <td key={'b' + (i + x)}> <TipButton item={item} tip={item.markets['0'].options[x]} addTip={this.props.addTip} tipType={item.markets['0'].type} /></td>
          )
        })
      }
      else {
        threeWay = ['1', 'X', '2'].map((a, x) => <td></td>)
      }
      if (item.markets['1'].options['0']) {
        BTS = item.markets['1'].options.map((option, x) => {
          return (
            <td key={'a' + i + x}><TipButton item={item} tip={item.markets['1'].options[x]} addTip={this.props.addTip} tipType={item.markets['1'].type} /></td>
          )
        })
      }
      else {
        BTS = ['Yes', 'No'].map((a, x) => {
          return (
            <td> </td>
          )
        })
      }
      if (item.markets['2'].options['0']) {
        total = item.markets['2'].options.map((option, x) => {
          return (
            <td key={'c' + i + x}><TipButton item={item} tip={item.markets['2'].options[x]} addTip={this.props.addTip} tipType={item.markets['2'].type} /></td>
          )
        })
      }
      else {
        total = ['Over', 'Under'].map((a, x) => {
          return (
            <td key={'ca' + i + x}> </td>
          )
        })
      }
      if (item.markets['3'].options['0']) {
        double = item.markets['3'].options.map((option, x) => {
          return (
            <td key={'d' + i + x}><TipButton item={item} tip={item.markets['3'].options[x]} addTip={this.props.addTip} tipType={item.markets['3'].type} /></td>
          )
        })
      }
      else {
        double = ['1X', '12', 'X2'].map(() => <td></td>)
      }
      return (
        <tr key={item._id}>
          <td scope="row">{moment(item.eventStart).format('DD/MM/YY [at] H:MM')}</td>
          <td>{item.gameName.toLowerCase()}</td>
          {threeWay}
          {double}
          {total}
          {BTS}
        </tr>
      )
    })
    return (
      <div className="col-sm-9">
        <table className="table table-sm table-condensed table-striped table-responsive" style={{ fontSize: 12 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Sides</th>
              <th>1</th>
              <th>X</th>
              <th>2</th>
              <th>1X</th>
              <th>12</th>
              <th>X2</th>
              <th>Under</th>
              <th>Over</th>
              <th>Yes</th>
              <th>No</th>
            </tr>
          </thead>
          <tbody>
            {matches}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
