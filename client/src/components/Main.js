import React, { Component } from 'react'
import TipButton from './TipButton.js'
import Auth from '../routes/auth'
import moment from 'moment'
import Drawer from 'material-ui/Drawer'
import Checkbox from 'material-ui/Checkbox'
import Side from './Side'
import G from './G'
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
      games: this.props.games
    }
    this.handleCheckPrem = this.props.gamesFuncs.handleCheckPrem
    this.handleCheckPrim = this.props.gamesFuncs.handleCheckPrim
    this.handleCheckBund = this.props.gamesFuncs.handleCheckBund
    this.handleCheckChamp = this.props.gamesFuncs.handleCheckChamp
    this.handleCheckFriendly = this.props.gamesFuncs.handleCheckFriendly
    this.handleCheckWorld = this.props.gamesFuncs.handleCheckWorld
    this.getGamesByLeague = this.props.gamesFuncs.getGamesByLeague
    this.getWorldCupGames = this.props.gamesFuncs.getWorldCupGames
  }

  componentDidMount() {
    this.gamesList();
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
        state.games[G['2615']].matches = data
        self.setState(state)
      });
  }
  render() {
    let matches = this.state.games.map((game, ii) => {
      let obj = {}
      if (game.selected === true) {
        obj[G[ii]] = game.matches.map((item, i) => {
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
                <td key={'aa' + i + x }> </td>
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
          <Table key={ii} matches={obj[G[ii]]} game={game} />
        )
      }
    })

    return (
      <div>
        <Drawer className="jum" open={true} width={200} containerStyle={{zIndex:'1000'}}>
          <p className="h6 col" style={{ paddingLeft: 15, paddingRight: 15, marginTop: 80}}> LEAGUES FILTER: </p>
          <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
            label="Premier League"
            defaultChecked={true}
            onCheck={this.handleCheckPrem}
          />
          <Checkbox className="col" style={{ display: 'block',fontSize: 15 }}
            label="Primera Division"
            defaultChecked={false}
            onCheck={this.handleCheckPrim}
          />
          <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
            label="Bundesliga"
            defaultChecked={false}
            onCheck={this.handleCheckBund}
          />
          <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
            label="Champions League"
            defaultChecked={false}
            onCheck={this.handleCheckChamp}
          />
          <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
            label="International"
            defaultChecked={false}
            onCheck={this.handleCheckWorld}
          />
          <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
            label="Int. Friendly"
            defaultChecked={false}
            onCheck={this.handleCheckFriendly}
          />
        </Drawer>
        <div className="row">
          <div className="col-md-9">
            {matches}
          </div>
          <div className="sideBar col-md-3">
            <Side tips={this.props.tips} handleSubmit={this.props.handleSubmit} handleClear={this.props.handleClear} removeTip={this.props.removeTip} />
          </div>
        </div >
      </div>
    );
  }
}

export default Main;
