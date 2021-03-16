import { combineReducers } from 'redux';
import articlesReducer from './articles-reducer';
import userReducer from './user-reducer';

const rootReducer = combineReducers({ articles: articlesReducer, user: userReducer });

export default rootReducer;
