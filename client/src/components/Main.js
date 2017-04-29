import React, { Component } from 'react'
import TipButton from './TipButton.js'
import Auth from '../routes/auth'
import moment from 'moment'
import Drawer from 'material-ui/Drawer'
import Checkbox from 'material-ui/Checkbox'
import Side from './Side'
import G from './G'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Helmet } from "react-helmet"
import MediaQuery from 'react-responsive'
import './Main.css'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leagues: this.props.games
    }
    this.gamesList = this.gamesList.bind(this)
    this.getGamesByLeague = this.props.gamesFuncs.getGamesByLeague.bind(this)
    this.columns = [{
      header: 'Date',
      accessor: 'date',
      style: { display: 'inline-flex', justifyContent: 'left', alignItems: 'center', textAlign: 'center', fontSize: 8 },
      maxWidth: 68,
      minWidth: 68
    }, {
      header: 'Sides',
      accessor: 'sides',
      minWidth: 100,
      style: { display: 'inline-flex', justifyContent: 'left', alignItems: 'center', textAlign: 'center', fontSize: 8 }
    }, {
      header: '1',
      accessor: 'one',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        <TipButton item={row.value} tip={row.value.markets[0].options[0]} addTip={this.props.addTip} tipMarket={row.value.markets[0]} />
    }, {
      header: 'X',
      accessor: 'x',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        <TipButton item={row.value} tip={row.value.markets[0].options[1]} addTip={this.props.addTip} tipMarket={row.value.markets[0]} />
    },
    {
      header: '2',
      accessor: 'two',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        <TipButton item={row.value} tip={row.value.markets[0].options[2]} addTip={this.props.addTip} tipMarket={row.value.markets[0]} />
    },
    {
      header: '+',
      expander: true,
      maxWidth: 20,
      minWidth: 20,
      style: { display: 'inline-flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' },
      render: ({ isExpanded }) => (
        <div style={{ textAlign: 'center' }}>
          {isExpanded ? '-' : '+'}
        </div>
      )
    }]
  }
  componentDidMount() {
    this.gamesList();
    this.getGamesByLeague('3148');
    this.getGamesByLeague('2560');
  }
  gamesList() {
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
        const leagues = this.state.leagues.map(league => league.league === 'Premier League' ? { ...league, matches: data } : league)
        let state = { ...this.state, leagues: leagues }
        this.setState(state)
      });
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
  generateColumn() {
    let arr = this.columns.filter(obj => !obj.expander)
    arr.push({
      header: '1X',
      accessor: 'onedraw',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        row.value.markets[3].options[0] ? 
        <TipButton item={row.value} tip={row.value.markets[3].options[0]} addTip={this.props.addTip} tipMarket={row.value.markets[3]} /> :
        ''
    },
      {
        header: '12',
        accessor: 'onetwo',
        maxWidth: 40,
        minWidth: 40,
        style: { textAlign: 'center', padding: 0 },
        render: row =>
          row.value.markets[3].options[1] ? 
          <TipButton item={row.value} tip={row.value.markets[3].options[1]} addTip={this.props.addTip} tipMarket={row.value.markets[3]} /> :
          ''
      },
      {
        header: 'X2',
        accessor: 'twodraw',
        maxWidth: 40,
        minWidth: 40,
        style: { textAlign: 'center', padding: 0 },
        render: row =>
          row.value.markets[3].options[2] ? 
          <TipButton item={row.value} tip={row.value.markets[3].options[2]} addTip={this.props.addTip} tipMarket={row.value.markets[3]} /> :
          ''
      },
      {
        header: 'Over',
        accessor: 'over',
        maxWidth: 40,
        minWidth: 40,
        style: { textAlign: 'center', padding: 0 },
        render: row =>
          row.value.markets[2].options[0] ? 
          <TipButton item={row.value} tip={row.value.markets[2].options[0]} addTip={this.props.addTip} tipMarket={row.value.markets[2]} /> :
          ''
      },
      {
        header: 'Under',
        accessor: 'under',
        maxWidth: 40,
        minWidth: 40,
        style: { textAlign: 'center', padding: 0 },
        render: row =>
          row.value.markets[2].options[1] ? 
          <TipButton item={row.value} tip={row.value.markets[2].options[1]} addTip={this.props.addTip} tipMarket={row.value.markets[2]} /> : 
          ''
      },
      {
        header: 'Yes',
        accessor: 'yes',
        maxWidth: 40,
        minWidth: 40,
        style: { textAlign: 'center', padding: 0 },
        render: row =>
          row.value.markets[1].options[0] ? 
          <TipButton item={row.value} tip={row.value.markets[1].options[0]} addTip={this.props.addTip} tipMarket={row.value.markets[1]} /> :
          ''
      },
      {
        header: 'No',
        accessor: 'no',
        maxWidth: 40,
        minWidth: 40,
        style: { textAlign: 'center', padding: 0 },
        render: row =>
          row.value.markets[1].options[1] ? 
          <TipButton item={row.value} tip={row.value.markets[1].options[1]} addTip={this.props.addTip} tipMarket={row.value.markets[1]} /> :
          ''
      })
    arr[0].style.fontSize = 10
    arr[1].style.fontSize = 10
    return arr
  }
  render() {
    let leagues = this.state.leagues.map((league) => {
      if (league.selected === true && league.matches[0]) {
        let data = league.matches.map((match) => {
          return {
            date: moment(match.eventStart).format('DD/MM H:MM'),
            sides: `${match.sideHome.toUpperCase()} vs ${match.sideAway.toUpperCase()}`,
            one: match,
            x: match,
            two: match,
            onedraw: match,
            onetwo: match,
            twodraw: match,
            over: match,
            under: match,
            yes: match,
            no: match
          }
        })
        return (
          <div key={'svg' + league.league}>
            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginBottom: 5 }}>
              <img src={league.svg} alt={`${league.country} - ${league.league}`} />
              <h4 style={{ margin: 0, paddingLeft: 5 }}>{league.league}</h4>
            </div>
            <MediaQuery query='(max-width: 840px)'>
              <ReactTable
                key={league.league}
                data={data}
                columns={this.columns}
                className='-striped -highlight'
                defaultPageSize={data.length < 10 ? data.length : 10}
                resizable={false}
                showPageSizeOptions={false}
                showPageJump={false}
                style={{ fontSize: 10, marginBottom: 20 }}
                SubComponent={(row) => {
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#333333', padding: 5 }}>
                      {row.row.one.markets[3].options[0] ? <div style={{ display: 'flex', backgroundColor: '#ebebe9', flex: 1, borderBottom: '1px solid black' }}>
                        <div style={{ flex: 4, paddingLeft: 5, display: 'flex', alignItems: 'center', borderRight: 'black solid 1px' }}>Double Chance:</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', paddingRight: 4, alignItems: 'center', borderRight: 'black solid 1px' }}>1X</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderRight: 'black solid 1px', backgroundColor: '#f8f8f6', padding: 0 }}>
                          {<TipButton item={row.row.one} tip={row.row.one.markets[3].options[0]} addTip={this.props.addTip} tipMarket={row.row.one.markets[3]} />}
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', paddingRight: 4, alignItems: 'center', borderRight: 'black solid 1px' }}>12</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderRight: 'black solid 1px', backgroundColor: '#f8f8f6', padding: 0 }}>
                          {<TipButton item={row.row.one} tip={row.row.one.markets[3].options[1]} addTip={this.props.addTip} tipMarket={row.row.one.markets[3]} />}
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', paddingRight: 4, alignItems: 'center', borderRight: 'black solid 1px' }}>X2</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f6', padding: 0 }}>
                          {<TipButton item={row.row.one} tip={row.row.one.markets[3].options[2]} addTip={this.props.addTip} tipMarket={row.row.one.markets[3]} />}
                        </div>
                      </div> : null}
                      {row.row.one.markets[2].options[0] ? <div style={{ display: 'flex', backgroundColor: '#ebebe9', flex: 1, borderBottom: '1px solid black' }}>
                        <div style={{ flex: 4, paddingLeft: 5, display: 'flex', alignItems: 'center', borderRight: 'black solid 1px' }}>Total Goals:</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', paddingRight: 4, alignItems: 'center', borderRight: 'black solid 1px' }}>2.5</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', paddingRight: 4, alignItems: 'center', borderRight: 'black solid 1px' }}>Over</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderRight: 'black solid 1px', backgroundColor: '#f8f8f6', padding: 0 }}>
                          {<TipButton item={row.row.one} tip={row.row.one.markets[2].options[0]} addTip={this.props.addTip} tipMarket={row.row.one.markets[2]} />}
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', paddingRight: 4, alignItems: 'center', borderRight: 'black solid 1px' }}>Under</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f6', padding: 0 }}>
                          {<TipButton item={row.row.one} tip={row.row.one.markets[2].options[1]} addTip={this.props.addTip} tipMarket={row.row.one.markets[2]} />}
                        </div>
                      </div> : null}
                      {row.row.one.markets[2].options[0] ? <div style={{ display: 'flex', backgroundColor: '#ebebe9', flex: 1, borderBottom: '1px solid black' }}>
                        <div style={{ flex: 4, paddingLeft: 5, display: 'flex', alignItems: 'center', borderRight: 'black solid 1px' }}>Both Teams To Score:</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', paddingRight: 4, alignItems: 'center', borderRight: 'black solid 1px' }}>Yes</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderRight: 'black solid 1px', backgroundColor: '#f8f8f6', padding: 0 }}>
                          {<TipButton item={row.row.one} tip={row.row.one.markets[1].options[0]} addTip={this.props.addTip} tipMarket={row.row.one.markets[1]} />}
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', paddingRight: 4, alignItems: 'center', borderRight: 'black solid 1px' }}>No</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f6', padding: 0 }}>
                          {<TipButton item={row.row.one} tip={row.row.one.markets[1].options[1]} addTip={this.props.addTip} tipMarket={row.row.one.markets[1]} />}
                        </div>
                      </div> : null}
                    </div>
                  )
                }}
              />
            </MediaQuery>
            <MediaQuery query='(min-width: 841px)'>
              <ReactTable
                key={league.league}
                data={data}
                columns={this.generateColumn()}
                className='-striped -highlight'
                defaultPageSize={data.length < 10 ? data.length : 10}
                resizable={false}
                showPageSizeOptions={false}
                showPageJump={false}
                style={{ fontSize: 10, marginBottom: 20 }}
              />
            </MediaQuery>
          </div>
        )
      }
    })
    return (
      <div>
        <Helmet>
          <title>{`Football Today - Make prediction for today's games`}</title>
        </Helmet>
        <NewDrawer games={this.state.leagues} gamesFuncs={this.props.gamesFuncs} />
        <div className="row">
          <div className="col-md-9">
            < div style={{ marginBottom: 60, marginTop: 10 }}> {leagues} </div >
          </div>
          <div className="sideBar col-md-3">
            <Side tips={this.props.tips} handleSubmit={this.props.handleSubmit} handleClear={this.props.handleClear} removeTip={this.props.removeTip} />
          </div>
        </div >
      </div>
    )
  }
}

export default Main

const NewDrawer = (props) => {
  return <Drawer className="jum" open={true} width={200} containerStyle={{ zIndex: '1000' }}>
    <p className="h6 col" style={{ paddingLeft: 15, paddingRight: 15, marginTop: 80 }}> LEAGUES FILTER: </p>
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[0].league}
      defaultChecked={props.games[0].selected}
      onCheck={props.gamesFuncs.handleCheckChamp}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[1].league}
      defaultChecked={props.games[1].selected}
      onCheck={props.gamesFuncs.handleCheckEuropa}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[2].league}
      defaultChecked={props.games[2].selected}
      onCheck={props.gamesFuncs.handleCheckPrem}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[3].league}
      defaultChecked={props.games[3].selected}
      onCheck={props.gamesFuncs.handleCheckBund}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[4].league}
      defaultChecked={props.games[4].selected}
      onCheck={props.gamesFuncs.handleCheckPrim}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[5].league}
      defaultChecked={props.games[5].selected}
      onCheck={props.gamesFuncs.handleCheckWorld}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[6].league}
      defaultChecked={props.games[6].selected}
      onCheck={props.gamesFuncs.handleCheckFriendly}
    />
  </Drawer>
}

