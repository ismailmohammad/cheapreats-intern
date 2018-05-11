import React, { Component } from 'react';

class ListItem extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.rank}</td>
                <td>{this.props.item}</td>
                <td>${this.props.revenue}</td>
                <td>{this.props.quantity}</td>
            </tr>
        )
    }
}

export default ListItem;