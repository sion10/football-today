import React, { Component } from 'react';
import Auth from '../routes/auth'
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import moment from 'moment'
import Masonry from 'react-masonry-component'
import Divider from 'material-ui/Divider';
import ActionDone from 'material-ui/svg-icons/action/done';
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
    predictionsList() {
        let self = this;
        return fetch('/api/predictions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            body: JSON.stringify({ page: self.state.page })
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
    render() {

        const predicts = this.state.predictions.map((item, num) => {
            const tips = item.tips.map((tip) => {
                return (
                    <div key={tip._id}>
                        <ListItem
                            leftIcon={<ActionDone style={{ margin: 0, marginTop: 12 }} viewBox={'0 0 50 25'} />}
                            primaryText={tip.eventName}
                            secondaryText={<p>{tip.betName}</p>}
                            style={{ color: '#686868', fontSize: 12, overflow: 'hidden', paddingLeft: 30 }}
                            disabled={true}
                        />
                        <Divider inset={true} style={{ marginLeft: 30 }} />
                    </div>
                )
            })
            return (
                <div className="grid-item" key={'div' + item._id + num}>
                    <Card style={{ marginBottom: 10 }}>
                        <CardHeader
                            title={`Status:  ${item.status}`}
                            subtitle={'shared: ' + moment(item.date).fromNow()}
                            avatar={item.user.picture}
                            children={<List> {tips}</List>}
                            subtitleStyle={{ fontSize: '0.76em' }}
                        />
                    </Card>
                </div>
            )
        })
        return (
            <div className="col-sm-9">
                <InfiniteScroll
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
