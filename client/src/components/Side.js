import React from 'react';
import { List, ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const Side = (props) => {
    let tips = props.tips.map((item, i) => {
        return (
            <ListItem key={i} primaryText={item} />
        )
    })
    return (
        <div className="col-sm-3">
            <List>
                <AppBar
                    title={<span>Tip Slip</span>}
                    iconElementLeft={<span></span>}
                    iconElementRight={<FlatButton label="Clear" />}
                />
                {tips}
            </List>
        </div>
    )
}


export default Side;