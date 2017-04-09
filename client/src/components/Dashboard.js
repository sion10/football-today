import React, { Component } from 'react'
import { CardHeader, Card, CardMedia, CardText } from 'material-ui/Card'
import FullStar from 'material-ui/svg-icons/toggle/star'
import Star from 'material-ui/svg-icons/toggle/star-border'
import Auth from '../routes/auth'
import Won from 'material-ui/svg-icons/action/done'
import Lost from 'material-ui/svg-icons/navigation/close'
import Open from 'material-ui/svg-icons/content/remove'
import moment from 'moment'
import Masonry from 'react-masonry-component'
import Divider from 'material-ui/Divider'
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from 'material-ui/CircularProgress'

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user:{},
            predictions: [],
            hasMore: true,
            page: 0
        }
        this.width = document.querySelector('.grid-sizer')
        this.predictionsList = this.predictionsList.bind(this)
        this.checkStatus = this.checkStatus.bind(this)
        this.parseJSON = this.parseJSON.bind(this)
        this.getUser = this.getUser.bind(this)
    }
    componentDidMount() {
        !this.props.user._id ? this.getUser() : this.state.hasMore ? this.predictionsList(this.state.page) : null
    }
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    }
    parseJSON(response) {
        return response.json();
    }
    getUser() {
        let self = this
        return fetch('api/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Auth.getToken()}`
            }
        }).then(this.checkStatus.bind(self))
            .then(this.parseJSON)
            .then(function (data) {
                let state = self.state
                state.user = data
                self.setState(state)
                self.predictionsList(self.state.page)
            });
    }
    predictionsList(page) {
        let self = this
        if (!this.state.hasMore) {
            return false
        }
        else {
            return fetch('/api/userpredictions', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${Auth.getToken()}`
                },
                body: JSON.stringify({
                    page: this.state.page,
                    user: this.props.user._id? this.props.user._id : this.state.user._id
                })
            }).then(this.checkStatus)
                .then(this.parseJSON)
                .then(function (data) {
                    if (self.state.predictions.length > 0 && data.page === 1) return
                    let prds = self.state.predictions.concat(data.predictions)
                    self.setState({
                        predictions: prds,
                        hasMore: data.hasMore,
                        page: self.state.page + 1
                    });
                });
        }

    }
    render() {
        let rank = []
        let colors = {
            '1': '#d59267',
            '2': '#a5c9e1',
            '3': '#b4b4b4',
            '4': '#dbb87e',
            '5': '#cc3e32'
        }
        for (let i = 0; i < 5; i++) {
            i < this.props.user.rank ? rank.push(<FullStar style={{ width: '18px', height: '18px' }} viewBox='-1.5 -1.5 27 27' color={colors[`${this.props.user.rank}`]} key={i} />) : rank.push(<Star style={{ width: '18px', height: '18px' }} viewBox='-1.5 -1.5 27 27' color='#f4dacb' key={i} />)
        }
        let predicts = this.state.predictions.map((item, num) => {
            const tips = item.tips.map((tip) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column' }} key={tip._id}>
                        <div style={{ display: 'flex' }} >
                            {tip.status === 'open' ?
                                <Open viewBox='-12 -12 48 48' style={{ color: '#30b8d5' }} /> :
                                tip.status === 'lost' ?
                                    <Lost viewBox='-12 -12 48 48' style={{ color: '#ff0000' }} /> :
                                    <Won viewBox='-12 -12 48 48' style={{ color: '#2cb373' }} />}
                            <h6 style={{ whiteSpace: ' nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '2em', fontSize: '0.8em', margin: 0 }}>{tip.eventName.toUpperCase()}</h6>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 25px 0px 25px' }} >
                            <span style={{ fontSize: '0.75em', color: 'rgba(0, 0, 0, 0.54)' }}>
                                {tip.betType === '3way' ? 'fulltime' : tip.betType.toLowerCase()}:
                            </span>
                            <span style={{ fontSize: '0.75em', color: 'rgba(0, 0, 0, 0.54)' }}>{moment(tip.eventStart).format('DD MMM [:] hh:mm')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 25px 0px 25px' }} >
                            <p style={{ fontSize: '0.65em', fontWeight: 600 }}>
                                {
                                    tip.betType === '3way' && tip.betName === '1' ?
                                        '1(' + tip.eventName.split('vs')[0].trim().toUpperCase() + ')' :
                                        tip.betType === '3way' && tip.betName === '2' ?
                                            '2(' + tip.eventName.split('vs')[1].trim().toUpperCase() + ')' :
                                            tip.betType === '3way' && tip.betName === 'X' ?
                                                'X (Draw)' :
                                                tip.betName
                                }
                            </p>
                            <p style={{ fontSize: '0.65em', fontWeight: 600 }}>@{parseFloat(tip.betValue).toFixed(2)}</p>
                        </div>
                    </div>
                )
            })
            return (
                <div className="grid-item" key={'div' + item._id + num}>
                    <Card style={{ marginBottom: 10 }}>
                        <CardHeader
                            title={item.user.name}
                            subtitle={`Status:  ${item.status}`}
                            avatar={item.user.picture}
                            subtitleStyle={{ fontSize: '0.76em' }}
                        />
                        {item.status === 'pending' ?
                            <Divider style={{ borderTop: '2px solid #30b8d5' }} /> :
                            item.status === 'won' ?
                                <Divider style={{ borderTop: '2px solid #2cb373' }}
                                /> :
                                <Divider style={{ borderTop: '2px solid #ff0000' }} />}
                        <CardText style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
                            {tips}
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
                                <p style={{ marginBottom: 0, paddingLeft: 10, fontWeight: 500, fontSize: '0.8em', color: '#686868' }}>Shared: {moment(item.date).fromNow()}</p>
                                <p style={{ marginBottom: 0, paddingRight: 10, fontWeight: 500, fontSize: '0.8em', color: '#686868' }}>Total: {parseFloat(item.coef).toFixed(2)}</p>
                            </div>
                        </CardText>
                    </Card>
                </div>
            )
        })
        return (
            <div className="row">
                <div className="col-sm-3 container">
                    <Card style={{marginBottom: 10}} >
                        <CardMedia >
                            <img src={this.props.user.pictureBig || 'https://www.webpagefx.com/data/marketing-persona-generator/img/placeholder.png'} alt='profile' />
                            <cardText>
                                <hr style={{ margin: 0 }} />
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '10px 0px 10px 0px' }}>
                                    <h4 style={{ textAlign: 'center' }} >{this.props.user.name}</h4>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ flex: 0.5, display: 'flex', flexDirection: 'column', borderRight: '1px solid #CECECE' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }} >Rank: </div>
                                            <div style={{ display: 'flex', justifyContent: 'center' }} >{rank}
                                            </div>
                                        </div>
                                        <div style={{ flex: 0.5, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }} >Points: </div>
                                            <div style={{ display: 'flex', justifyContent: 'center' }} >{parseFloat(this.props.user.points).toFixed(0)}</div>
                                        </div>
                                    </div>
                                </div>
                            </cardText>
                        </CardMedia>
                    </Card>
                </div>
                <div className="col-sm-9 container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.predictionsList}
                        hasMore={this.state.hasMore}
                        loader={<div className="loader"> <CircularProgress /></div>}
                        useWindow={true}
                    >
                        <Masonry
                            className={'grid'}
                            options={{
                                itemSelector: '.grid-item',
                                columnWidth: this.width,
                                gutter: 5
                            }}>
                            <div className="grid-sizer col-xs-12 col-sm-3"></div>
                            {predicts}
                        </Masonry>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}
export default Dashboard

