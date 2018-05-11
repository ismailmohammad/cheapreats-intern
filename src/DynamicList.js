import React, { Component } from 'react';
import './DynamicList.css';
import Card from './components/Card';
import ListItem from './ListItem';

class DynamicList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardContent: [],
            orderData: [],
            loadingData: true,
            itemArray: [],
            sortOptions: ['Revenue', 'Quantity'],
            sortBy: "Revenue",
            currentSort: "Quantity"
        };
    }

    componentDidMount() {
        // Authenticate Vendor
        this.props.CE.Vendor.authenticate("fb7c84da-cb4e-487a-94fe-cc1281e77e7c")
        .then(token => {
            console.log("SDK authenticated with token " + token);
        })
        .catch(e => {
            console.log(e);
        });
        this.queryOrders();
    }

    queryOrders = () => {
        // Query Orders
        this.props.CE.Graph.query(`
        {   
            myOrders {
              items {
                quantity
                price
                menuItem {
                  name
                  price
                }
              }
              comboItems {
                  discount
              }
              vendor {
                  taxRate
              }
            }
          }
        `).then(result => {
            console.log(result);
            this.setState({ 
                loadingData: false,
                orderData: result
            });
            this.retreiveItemsPrices();
            this.sortItemsBy("Quantity");
            this.cardTable();
        }).catch(e => {
            console.log(e);
        })
    }

    sortItemsBy = (sortArg) => {
        let unsorted = this.state.itemArray;
        if (sortArg === "Quantity") {
            unsorted.sort(function (a, b) {
                return b.quantity - a.quantity;
            });
        } else if (sortArg === 'Revenue') {
            unsorted.sort(function (a, b) {
                return b.price - a.price;
            });
        }
        this.setState({ itemArray: unsorted });
    }


    retreiveItemsPrices = () => {
        let items = [];
        let prices = [];
        let quantities = [];
        let orderData = this.state.orderData;
        for (var i in orderData.myOrders) {
            for (var j in orderData.myOrders[i].items) {
                let newItem = orderData.myOrders[i].items[j].menuItem.name;
                let quantity = orderData.myOrders[i].items[j].quantity;
                let price = orderData.myOrders[i].items[j].price;
                if (items.indexOf(newItem) > -1) {
                    prices[items.indexOf(newItem)] += price;
                    quantities[items.indexOf(newItem)] += quantity;
                } else {
                    items.push(newItem);
                    prices.push(price);
                    quantities.push(quantity);
                }
                }
            }
        let itemArray = [];
        for (let item in items) {
            itemArray.push({name: items[item], price: prices[item], quantity: quantities[item]});
        }
        this.setState({
            itemArray: itemArray,
        });
    }

    cardTable = () => {
        let tableRows = [];
        tableRows.push(this.state.itemArray.map((elem, index) => {
            // Implement taxRate
            return <ListItem key={index} rank={index + 1} item={elem.name} revenue={(elem.price / 100 * 1.13).toFixed(2)} quantity={elem.quantity}/>
        }));
        let table = [
            <table key="item-table">
                <tbody>
                <tr key="table-headings">
                <th>Rank</th>
                <th>Item</th>
                <th>Revenue Generated</th>
                <th>Quantity</th>
              </tr>
              {tableRows}
              </tbody>
        </table>, <h4 key="items-depleted">No more items :(</h4>];
        this.setState({cardContent: table});
    }

    sortSwitch = () => {
        let currentSort = this.state.sortBy; 
        this.sortItemsBy(currentSort);
        this.cardTable();
        let sortArg = '';
        let sortOptionsLength = this.state.sortOptions.length - 1;
        let index = this.state.sortOptions.indexOf(this.state.sortBy);
        if (index === sortOptionsLength) {
            sortArg = this.state.sortOptions[0];
        } else {
            sortArg = this.state.sortOptions[index + 1];
        }
        this.setState({ currentSort: currentSort, sortBy: sortArg })
    }

    render() {
        return (
        <div className="dynamiclist-container">
        {this.state.loadingData ? null : 
        <Card 
            heading="Best Sellers"
            description={"Ordered by " + this.state.currentSort}
            content={this.state.cardContent}
            button={true}
            buttonBefore={true}
            buttonText={"Sort By: " + this.state.sortBy}
            onClick={this.sortSwitch}
        />
        }
        </div>
        )
    }
}

export default DynamicList;