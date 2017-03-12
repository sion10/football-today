import React, { Component } from 'react';

class TipButton extends Component {
    
    handleOnClick() {
        let obj = {}
        obj.game = this.props.item
        obj.tip = this.props.tip
        this.props.addTip(obj);
    }
    
    render() {
        return (
            <span onClick={this.handleOnClick.bind(this)}>{this.props.tip.value}</span>
        )
    }


}
export default TipButton;


