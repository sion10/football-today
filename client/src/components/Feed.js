import React, { Component } from 'react';
import Auth from '../routes/auth'
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import moment from 'moment'
import Masonry from 'react-masonry-component'
import Divider from 'material-ui/Divider';
import './Feed.css'


class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            predictions: [],
            hasMore: true,
            page: 0
        }
        this.width = document.querySelector('.grid-sizer')
        this.predictionsList = this.predictionsList.bind(this)
    }
    componentDidMount() {
        this.predictionsList()
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
                    let prds = self.state.predictions.concat(data.predictions)
                    self.setState({
                        predictions: prds,
                        hasMore: data.hasMore,
                        page: data.page
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

        const predicts = this.state.predictions.map((item, num) => {
            const tips = item.tips.map((tip) => {
                return (
                    <div key={tip._id}>
                        <Divider inset={false} />
                        <ListItem
                            primaryText={tip.eventName}
                            secondaryText={<p style={{ fontSize: '1em', fontStyle: 'italic' }}>{tip.betType.toLowerCase()}:<span style={{ float: 'right', paddingRight:1 }}>{tip.betName}</span></p>}
                            style={{ color: '#686868', paddingLeft: 0, fontSize: 12, overflow: 'hidden' }}
                            disabled={true}
                        />
                    </div>
                )
            })
            return (
                <div className="grid-item" key={'div' + item._id + num}>
                    <Card style={{ marginBottom: 10 }}>
                        <CardHeader
                            title={`Status:  ${item.status}`}
                            subtitle={item.user.name}
                            avatar={item.user.picture}
                            children={<div style={{ display: 'flex', flexDirection: 'column' }}>
                                <List> {tips}</List>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <div>
                                        <p style={{ marginBottom: 0, paddingRight: 5, fontWeight: 'bold', fontSize: 12, color: '#686868' }}>shared: {moment(item.date).fromNow()}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <p style={{ marginBottom: 0, paddingRight: 5, fontWeight: 'bold', fontSize: 12, color: '#686868' }}>Total: {parseFloat(item.coef).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>}
                            subtitleStyle={{ fontSize: '0.76em' }}
                        />
                    </Card>
                </div>
            )
        })
        return (
            <div className="col-sm-9">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.predictionsList}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader"> <CircularProgress /></div>}
                    useWindow={true}
                >
                    <Masonry className={'grid'}
                        options={{
                            itemSelector: '.grid-item',
                            columnWidth: this.width,
                            gutter: 5
                        }}>
                        <div className="grid-sizer col-xs-12 col-sm-4 col-md-3"></div>
                        {predicts}
                    </Masonry>
                </InfiniteScroll>
            </div>
        );
    }

}


export default Feed;
