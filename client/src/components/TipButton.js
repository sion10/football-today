import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class TipButton extends Component {
    
    handleOnClick() {
        let obj = {}
        obj.game = this.props.item
        obj.tip = this.props.tip
        obj.market = this.props.tipMarket
        this.props.addTip(obj);
    }
    
    render() {
        return (
            <FlatButton labelStyle={{paddingRight:3, paddingLeft:3, fontSize:12, textAlign:'center'}} 
            style={{padding:0, minWidth:37, height:'100%', width:'100%'}} label={parseFloat(this.props.tip.v).toFixed(2)} 
            onTouchTap={this.handleOnClick.bind(this)}></FlatButton>
        )
    }


}
export default TipButton;


