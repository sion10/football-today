import React, { Component } from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        }

    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-3 container">
                    <Card>
                        <CardMedia >
                          
                        </CardMedia>
                    </Card>
                </div>
                    <div className="col-sm-9 container">
                        <div className="jumbotron" >
                            <h1 className="display-1" style={{ marginTop: 50 }}>Dashboard page will go here</h1>

                        </div>
                    </div>
                </div>
                )
    }
}
export default Dashboard

