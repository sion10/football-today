import React from 'react';
import { List, ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { browserHistory } from 'react-router';
import Subheader from 'material-ui/Subheader';

const Side = (props) => {
    let handleMakePred = function () {
        browserHistory.push('/games')
    }
    const styleDef = {
        display: 'inline-block',
        minHeight: 300,
        flex: 1,
        marginTop: 10,
        marginBottom: 8,
    };
    const style = {
        display: 'flex',
        justifyContent: 'center',
        minHeight: 300,
        flex: 1,
        marginTop: 10,
        marginBottom: 8,
    };
    const inner = {
        alignSelf: 'center',
        textAlign: 'center'
    }


    let tips = props.tips.map((item, i) => {
        return (
            <ListItem key={i}
                primaryText={item.eventName}
                secondaryText={<p>{item.betValue}</p>}
            />
        )
    })
    return (
        <div className="col-sm-3">
            <List style={{padding: 0 }}>
                <AppBar
                    style={{ zIndex: '1' }}
                    title={<span>Tip Slip</span>}
                    iconElementLeft={<span></span>}
                    iconElementRight={<FlatButton label="Clear" />}
                    onRightIconButtonTouchTap={props.handleClear}
                    zDepth={2}
                />
                {tips[0] ? <Paper style={styleDef} zDepth={2}> {tips} </Paper> : <Paper style={style} zDepth={2}> <div style={inner}><Subheader style={{ fontSize: 18, padding: 0 }}>Your Tip Slip Is Empty</Subheader><p style={{ fontStyle: 'italic', fontSize: 12, lineHeight: 0.2, color: '#b4b6ba' }}><br />make predictions to submit a tip</p></div> </Paper>}
                {location.pathname !== '/games' ?
                    <RaisedButton  onTouchTap={handleMakePred} label="Make Predictions" primary={true} /> :
                    <RaisedButton  onTouchTap={props.handleSubmit} label="Submit Tip" primary={true} disabled={tips[0] ? false : true} />}
            </List>

        </div>
    )
}


export default Side;