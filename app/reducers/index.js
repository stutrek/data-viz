// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import shapes from '../components/Shapes/reducer';
import data from '../components/Data/reducer';

const rootReducer = combineReducers({
  shapes,
  data,
  router,
});

export default rootReducer;
