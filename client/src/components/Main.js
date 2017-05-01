import React, { Component } from 'react'
import TipButton from './TipButton.js'
import moment from 'moment'
import Drawer from 'material-ui/Drawer'
import Checkbox from 'material-ui/Checkbox'
import Side from './Side'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Helmet } from "react-helmet"
import MediaQuery from 'react-responsive'
import columns from '../data/columns'
import colBig from '../data/colBig'
import './Main.css'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leagues: this.props.games
    }
    this.gamesList = this.props.gamesFuncs.gamesList.bind(this)
    this.getGamesByLeague = this.props.gamesFuncs.getGamesByLeague.bind(this)
    this.columns = columns(this.props)
  }
  componentDidMount() {
    this.gamesList();
    this.getGamesByLeague('3148');
    this.getGamesByLeague('2560');
  }
  generateColumn() {
    let arr = this.columns.filter(obj => !obj.expander)
    arr = arr.concat(colBig(this.props))
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
      onCheck={() => props.gamesFuncs.handleCheckLeague('3148')}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[1].league}
      defaultChecked={props.games[1].selected}
      onCheck={() => props.gamesFuncs.handleCheckLeague('2560')}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[2].league}
      defaultChecked={props.games[2].selected}
      onCheck={props.gamesFuncs.handleCheckPrem}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[3].league}
      defaultChecked={props.games[3].selected}
      onCheck={() => props.gamesFuncs.handleCheckLeague('2609')}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[4].league}
      defaultChecked={props.games[4].selected}
      onCheck={() => props.gamesFuncs.handleCheckLeague('2553')}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[5].league}
      defaultChecked={props.games[5].selected}
      onCheck={() => props.gamesFuncs.handleCheckLeague('96892')}
    />
    <Checkbox className="col" style={{ display: 'block', fontSize: 15 }}
      label={props.games[6].league}
      defaultChecked={props.games[6].selected}
      onCheck={() => props.gamesFuncs.handleCheckLeague('2673')}
    />
  </Drawer>
}

