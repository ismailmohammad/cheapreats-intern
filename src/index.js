import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CE from 'cheapreats-node-sdk';

CE.switchAdaptorMode('qa');

ReactDOM.render(<App CE={CE}/>, document.getElementById('root'));
registerServiceWorker();
