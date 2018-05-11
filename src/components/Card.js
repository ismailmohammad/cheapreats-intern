import React, { Component } from 'react';
import './Card.css';
import Button from './Button';

class Card extends Component {

    render() {
        return (
            <div className="cheapreats-card">
                <div className="cheapreats-card-content">
                    {this.props.heading ? <h1 className="cheapreats-card-heading">{this.props.heading}</h1> : null}
                    {this.props.description ? <h2 className="cheapreats-card-description">{this.props.description}</h2> : null}
                    {this.props.button === true && this.props.buttonBefore ? <Button text={this.props.buttonText} onClick={this.props.onClick}/> : null}
                    {this.props.content.length > 0 ? this.props.content : null}
                    {this.props.button === true && !this.props.buttonBefore ? <Button text={this.props.buttonText} onClick={this.props.onClick}/> : null}
                </div>
            </div>
        )
    }
}

export default Card;