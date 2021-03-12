import { combineReducers } from 'redux';
import articlesReducer from './reducers/articles-reducer';
import userReducer from './reducers/user-reducer';

const rootReducer = combineReducers({ articles: articlesReducer, user: userReducer });

export default rootReducer;
