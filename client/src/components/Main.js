import React, { Component } from 'react';
import TipButton from './TipButton.js'
import Auth from '../routes/auth'
import moment from 'moment'
import Checkbox from 'material-ui/Checkbox';
import './Main.css'

const Table = (props) => {
  return (
    <table className="table table-sm table-condensed table-striped table-responsive table-bordered" style={{ fontSize: 12 }}>
      <thead>
        <tr>
          <th colSpan="12">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={props.game.svg} alt={props.game.country} />
              <div style={{ verticalAlign: 'middle' }}>{props.game.country} - {props.game.league} </div>
            </div>
          </th>
        </tr>
      </thead>
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
        {props.matches}
      </tbody>
    </table>
  );
};



class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: {
        '2609': {
          matches: [],
          selected: false,
          country: 'Germany',
          league: 'Bundesliga',
          svg: '/flagsvg/de.svg'
        },
        '2553': {
          matches: [],
          selected: false,
          country: 'Spain',
          league: 'Primera Division',
          svg: '/flagsvg/esp.svg'
        },
        '2615': {
          matches: [],
          selected: true,
          country: 'England',
          league: 'Premier League',
          svg: '/flagsvg/eng.svg'
        },
        '96892': {
          matches: [],
          selected: false,
          country: 'International',
          league: 'World Cup',
          svg: '/flagsvg/fifa.svg'
        },
        '2673': {
          matches: [],
          selected: false,
          country: 'International',
          league: 'Friendly Matches',
          svg: '/flagsvg/fifa.svg'
        }
      }
    }
    this.handleCheckPrem = this.handleCheckPrem.bind(this)
    this.handleCheckPrim = this.handleCheckPrim.bind(this)
    this.handleCheckBund = this.handleCheckBund.bind(this)
    this.handleCheckFriendly = this.handleCheckFriendly.bind(this)
    this.handleCheckWorld = this.handleCheckWorld.bind(this)
    this.getGamesByLeague = this.getGamesByLeague.bind(this)
    this.getWorldCupGames = this.getWorldCupGames.bind(this)
  }

  componentDidMount() {
    this.gamesList();
  }
  handleCheckPrem() {
    let state = this.state
    state.games['2615'].selected = !this.state.games['2615'].selected
    this.setState(state)
  }
  handleCheckPrim() {
    if (!this.state.games['2553'].selected && !this.state.games['2553'].matches[0]) {
      this.getGamesByLeague('2553')
    }
    else {
      let state = this.state
      state.games['2553'].selected = !this.state.games['2553'].selected
      this.setState(state)
    }
  }
  handleCheckBund() {
    if (!this.state.games['2609'].selected && !this.state.games['2609'].matches[0]) {
      this.getGamesByLeague('2609')
    }
    else {
      let state = this.state
      state.games['2609'].selected = !this.state.games['2609'].selected
      this.setState(state)
    }
  }
  handleCheckWorld() {
    if (!this.state.games['96892'].selected && !this.state.games['96892'].matches[0]) {
      this.getWorldCupGames()
    }
    else {
      let state = this.state
      state.games['96892'].selected = !this.state.games['96892'].selected
      this.setState(state)
    }
  }
  handleCheckFriendly() {
    if (!this.state.games['2673'].selected && !this.state.games['2673'].matches[0]) {
      this.getGamesByLeague('2673')
    }
    else {
      let state = this.state
      state.games['2673'].selected = !this.state.games['2673'].selected
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
        state.games['96892'].selected = !this.state.games['96892'].selected
        state.games['96892'].matches = data
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
        state.games[league].selected = !this.state.games[league].selected
        state.games[league].matches = data
        this.setState(state)
      })
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
  parseJSON(response) {
    return response.json();
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
    }).then(this.checkStatus)
      .then(this.parseJSON)
      .then((data) => {
        let state = self.state
        state.games['2615'].matches = data
        self.setState(state)
      });
  }
  render() {
    let matches = Object.keys(this.state.games).map((key) => {
      let obj = {}
      if (this.state.games[key].selected === true) {
        obj[key] = this.state.games[key].matches.map((item, i) => {
          let threeWay, BTS, total, double
          if (item.markets['0'].options['0']) {
            threeWay = item.markets['0'].options.map((option, x) => {
              return (
                <td key={'b' + (i + x)}> <TipButton item={item} tip={item.markets['0'].options[x]} addTip={this.props.addTip} tipMarket={item.markets['0']} /></td>
              )
            })
          }
          else {
            threeWay = ['1', 'X', '2'].map((a, x) => <td></td>)
          }
          if (item.markets['1'].options['0']) {
            BTS = item.markets['1'].options.map((option, x) => {
              return (
                <td key={'a' + i + x}><TipButton item={item} tip={item.markets['1'].options[x]} addTip={this.props.addTip} tipMarket={item.markets['1']} /></td>
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
                <td key={'c' + i + x}><TipButton item={item} tip={item.markets['2'].options[x]} addTip={this.props.addTip} tipMarket={item.markets['2']} /></td>
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
                <td key={'d' + i + x}><TipButton item={item} tip={item.markets['3'].options[x]} addTip={this.props.addTip} tipMarket={item.markets['3']} /></td>
              )
            })
          }
          else {
            double = ['1X', '12', 'X2'].map((a, x) => <td key={'da' + i + x}></td>)
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
          <Table key={key} matches={obj[key]} game={this.state.games[key]} />
        )
      }
    })


    return (
      <div className="col-sm-9">
        <div className="jumbotron row" style={{ display: 'flex', margin: 0, padding: 0, marginBottom: 10, paddingTop: 10 }}>
          <p className="h5 col" style={{ paddingLeft: 15, paddingRight: 15 }}> Filter: </p>
          <Checkbox className="col" style={{ display: 'block' }}
            label="Premier League"
            defaultChecked={true}
            onCheck={this.handleCheckPrem}
          />
          <Checkbox className="col" style={{ display: 'block' }}
            label="Primera Division"
            defaultChecked={false}
            onCheck={this.handleCheckPrim}
          />
          <Checkbox className="col" style={{ display: 'block' }}
            label="Bundesliga"
            defaultChecked={false}
            onCheck={this.handleCheckBund}
          />
          <Checkbox className="col" style={{ display: 'block' }}
            label="International"
            defaultChecked={false}
            onCheck={this.handleCheckWorld}
          />
          <Checkbox className="col" style={{ display: 'block' }}
            label="Int. Friendly"
            defaultChecked={false}
            onCheck={this.handleCheckFriendly}
          />
        </div>
        {matches}
      </div >
    );
  }
}

export default Main;
