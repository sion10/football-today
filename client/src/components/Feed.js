import React, { Component } from 'react';


class Feed extends Component {
    constructor() {
        super();

        this.state = {
            predictions: []
        }
    }
    componentDidMount() {
        this.predictionsList();
    }
    predictionsList() {
        var self = this;
        return fetch('/api/predictions', {
            accept: 'application/json',
        }).then(checkStatus)
            .then(parseJSON)
            .then(function (data) {
                self.setState({ predictions: data });
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

        const predicts = this.state.predictions.map((item) => {
            const tips = item.tips.map((tip) => {
                return (
                    <div key={tip._id}>
                    <p>{tip.eventName} : {tip.betId} </p>
                    </div>
                )
            })
            return (
                <div key={item._id}>
                    <hr/>
                    <p>{item.date}</p>
                    <p>{item.status}</p>
                    <p>tips:</p>
                    {tips}
                </div>
            )
        })
        return (
            <div className="col-sm-9">
                {predicts}
            </div>
        );
    }

}


export default Feed;
