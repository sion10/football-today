import React, { Component } from 'react';

class TipButton extends Component {
    
    handleOnClick() {
        let obj = {}
        obj.game = this.props.item
        obj.tip = this.props.tip
        obj.tipType = this.props.tipType
        this.props.addTip(obj);
    }
    
    render() {
        return (
            <span onClick={this.handleOnClick.bind(this)}>{this.props.tip.v}</span>
        )
    }


}
export default TipButton;


