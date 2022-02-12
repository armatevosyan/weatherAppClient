import {combineReducers} from 'redux';
import reducers from './Weather/reducer'

const reducer = combineReducers({
  weather: reducers,
});

export default reducer;
