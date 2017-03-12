import React from 'react';
import { List, ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const Side = (props) => {
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
            <List>
                <AppBar
                    title={<span>Tip Slip</span>}
                    iconElementLeft={<span></span>}
                    iconElementRight={<FlatButton label="Clear" />}
                    onRightIconButtonTouchTap={props.handleClear}
                />
                {tips}
                <RaisedButton onClick={props.handleSubmit} label="Submit Tip" primary={true} />
            </List>

        </div>
    )
}


export default Side;