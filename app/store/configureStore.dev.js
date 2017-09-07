import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import filedrop from '../middleware/filedrop'
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const history = createHashHistory();

const configureStore = () => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);
  middleware.push(filedrop());

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Create Store
  const store = createStore(rootReducer, {}, applyMiddleware(...middleware));
  return store;
};

export default { configureStore, history };

console.log('dev');
