import {combineReducers} from 'redux';
import columnReducer from './columnsReducer';

export default combineReducers({
  columns: columnReducer
})