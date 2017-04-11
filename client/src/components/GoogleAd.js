import React, { Component } from 'react'
import { Card, CardText } from 'material-ui/Card'

class GoogleAd extends Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
    render() {
        return (
            <Card style={{ marginBottom: 10 }}>
                <CardText style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
                    <ins className="adsbygoogle"
                        style={{display:'block'}}
                        data-ad-client="ca-pub-7948871671167561"
                        data-ad-format="auto"></ins>
                </CardText>
            </Card>
        );
    }
}
export default GoogleAd;

