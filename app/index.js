import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ReactGA from 'react-ga';

import Store from './Store';
import routes from './routes';
import './styling/index.scss';

const store = new Store();
ReactGA.initialize(process.env.DECLINE_GOOGLE_ANALYTICS_TOKEN);

const history = syncHistoryWithStore(hashHistory, store);
history.listen((location) => ReactGA.pageview(location.pathname));

const routerProps = { routes, history };
render(
    <Provider store={ store } >
        <Router { ...routerProps } />
    </Provider>,
    document.getElementById('app')
);