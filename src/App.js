import React, { Component } from 'react';
import './App.css';
import GridLayout from 'react-grid-layout';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import Card from './components/Card';
import DynamicList from './DynamicList';
import StaticBox from './StaticBox';

class App extends Component {
    
  onClick = () => {
    alert("Sample Button was Clicked");
  }

  render() {
    let layout = [
      {i: 'dynamic-list', x: 0, y: 10, w: 2, h: 9, minW: 2, minH: 9},
      {i: 'static-box', x: 0, y: 0, w: 2, h: 7, static: true},
      {i: 'card-example', x: 2, y: 9, w: 2, h: 7, minW: 2, minH: 7}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1800}>
        <div key="dynamic-list">
         <DynamicList CE={this.props.CE} />
        </div>
        <div key="static-box">
          <StaticBox CE={this.props.CE} />
        </div>
        <div key="card-example">
        <Card 
          heading="Card Example"
          description="Card Description"
          button={true}
          buttonText="Sample Button"
          onClick={this.onClick}
          content={[<p key="1">This is the card content. It just keeps on going and going until... until what?</p>]}>
        </Card>
        </div>
      </GridLayout>
    );
  }
}

export default App;
