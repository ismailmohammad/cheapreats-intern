import React, { Component } from 'react';
import './StaticBox.css';
import Card from './components/Card';
import { generateRevenue, generateMonthlySales, getCustomers} from './utils';

class StaticBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingData: false,
            cardContent: [],
            orderData: [],
            heading: "Select Statistic...",
            description: "Choose the desired statistic below",
            statistic: '',
            revenue: 0,
            monthLong: '',
            month: "",
            totalSales: 0,
            customers: 0
        };
    }

    componentDidMount() {
        // // Authenticate Vendor
        this.props.CE.Vendor.authenticate("fb7c84da-cb4e-487a-94fe-cc1281e77e7c")
        .then(token => {
            console.log("SDK authenticated with token " + token);
        })
        .catch(e => {
            console.log(e);
        });
        let date = new Date(),
        locale = "en-us",
        month = date.toLocaleString(locale, { month: "long" });
        this.setState({
            monthLong: month,
            month: date.getMonth() 
        });
        this.queryOrders();
    }

    queryOrders = () => {
        // Query Orders
        this.props.CE.Graph.query(`
        {   
            myOrders {
              createdAt
              customerId
              items {
                quantity
                price
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
            console.log(JSON.stringify(result));
            this.setState({ 
                loadingData: false,
                orderData: result,
                revenue: generateRevenue(result),
                totalSales: generateMonthlySales(result, this.state.month),
                customers: getCustomers(result, this.state.month)
            });
            this.select();
        }).catch(e => {
            console.log(e);
        })
    }

    handleChange = (e) => {
        this.setState({ statistic: e.target.value});
        let heading = "";
        let description = "";
        if (e.target.value === 'tsales') {
            heading = "Total Sales for " +  this.state.monthLong;
            description = (<p>${(this.state.totalSales / 100).toFixed(2)}</p>);
        } else if (e.target.value === 'revenue') {
            heading = "Total Revenue to Date (Taxes Included)";
            description = (<p>${(this.state.revenue / 100).toFixed(2)}</p>);
        } else if (e.target.value === 'customers') {
            heading = "Unique Customer(s) for " + this.state.monthLong;
            description = (<p>{this.state.customers} {this.state.customers === 1 ? "customer" : "customers"}.</p>);
        } else if (e.target.value === "") {
            heading = "Select Statistic to display";
            description = "Choose the desired statistic below";
        }
        this.setState({
            heading: heading,
            description: description
        });
    }

    select = () =>  {
        let select = (
        <span key="statistic">
        <i className="fa fa-cog"></i>
        <select value={this.props.statistic} onChange={this.handleChange}>
            <option value=""></option>
            <option value="tsales">Total Sales - Monthly</option>
            <option value="revenue">Revenue</option>
            <option value="customers">Customers - Monthly</option>
        </select>
        </span>);
        let cardContent = this.state.cardContent;
        cardContent.push(select, null);
        this.setState({ cardContent: cardContent});
    }

    render() {
        return (
        <div className="staticbox-container">
        {this.state.loadingData ? null : 
        <Card 
            heading={this.state.heading}
            description={this.state.description}
            content={this.state.cardContent}
            statistic={this.state.statistic}
        />
        }
        </div>
        )
    }
}

export default StaticBox;