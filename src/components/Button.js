import React, { Component } from 'react';
import './Button.css';

class Button extends Component {

    handleClick = () => {
        this.props.onClick();
    }

    render() {
        return (
            <a onClick={this.handleClick} className="cheapreats-button">{this.props.text}</a>
        )
    }
}

export default Button;