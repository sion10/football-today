import React, { Component } from 'react'
import Auth from '../routes/auth'
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from 'material-ui/CircularProgress'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { Link } from 'react-router'
import moment from 'moment'
import Masonry from 'react-masonry-component'
import Divider from 'material-ui/Divider'
import Side from './Side.js'
import Won from 'material-ui/svg-icons/action/done'
import Lost from 'material-ui/svg-icons/navigation/close'
import Open from 'material-ui/svg-icons/content/remove'
import GoogleAd from './GoogleAd'
import RSS from '../helper.js'
import {Helmet} from "react-helmet"
import './Feed.css'

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {  
            predictions: [],
            hasMore: true,
            page: 0
        }
        RSS ? null : this.width = document.querySelector('.grid-sizer')
        this.predictionsList = this.predictionsList.bind(this)
    }
    componentDidMount() {
        this.predictionsList();
    }
    predictionsList(page) {
        let self = this;
        if (!self.state.hasMore) {
            return false
        }
        else {
            return fetch('/api/predictions', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${Auth.getToken()}`
                },
                body: JSON.stringify({ page: this.state.page })
            }).then(checkStatus)
                .then(parseJSON)
                .then(function (data) {
                    if (self.state.predictions.length > 0 && data.page === 1) return
                    let prds = self.state.predictions.concat(data.predictions)
                    self.setState({
                        predictions: prds,
                        hasMore: data.hasMore,
                        page: self.state.page + 1
                    });
                });

            function checkStatus(response) {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                }
                const error = new Error(`HTTP Error ${response.statusText}`);
                error.status = response.statusText;
                error.response = response;
                throw error;
            }
            function parseJSON(response) {
                return response.json();
            }
        }

    }

    render() {

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
                        <Link to={"/profile/" + item.user.fbId}> <CardHeader
                            title={item.user.name}
                            subtitle={`Status:  ${item.status}`}
                            avatar={item.user.picture}
                            subtitleStyle={{ fontSize: '0.76em' }}
                        /> </Link>
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
        predicts.splice(3, 0,
            <div className="grid-item" key={'adbyG' + 3}>
                <GoogleAd slot={'7770703735'} />
            </div>
        )
        return (
            <div className="row">
                <Helmet>
                    <title>{`Football Today - Feed of recent football predictions`}</title>
                </Helmet>
                <div className="col-md-9">
                    <div>
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
                <div className="sideBar col-md-3">
                    <Side tips={this.props.tips} handleSubmit={this.props.handleSubmit} handleClear={this.props.handleClear} removeTip={this.props.removeTip} />
                </div>
            </div>
        );
    }

}


export default Feed;
