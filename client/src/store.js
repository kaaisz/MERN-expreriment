import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middleware = [thunk];

// initialize createStore to enable redux
// [] is for reducer, {} is for initial state, then applyMiddleWare
const store = createStore(() => [], {}, applyMiddleware(...middleware));

export default store;