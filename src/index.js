import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import HTTPService from './common/HTTPService';
import Application from './common/Application';

window.application = new Application();
window.HTTPService = new HTTPService();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
