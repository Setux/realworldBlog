import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import classes from './app.module.scss';
import Header from '../Header';
import FullArticle from '../ArticleList/FullArticle';
import ArticleList from '../ArticleList';
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import rootReducer from '../../store/reducer';
import { getUser } from "../../store/actions";

const actionSanitizer = (action) =>
  action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ? { ...action, data: '<<LONG_BLOB>>' } : action;

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionSanitizer,
        stateSanitizer: (state) => (state.data ? { ...state, data: '<<LONG_BLOB>>' } : state),
      })
    : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const { dispatch } = store

export default class App extends React.Component {

    componentDidMount() {
        dispatch(getUser())
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <main className={classes.main}>
                        <Header />
                        <Route path="/" component={ArticleList} exact />
                        <Route path="/articles" component={ArticleList} exact />
                        <Route
                            path="/articles/:slug"
                            render={({ match }) => {
                                const { params } = match;
                                return <FullArticle slug={params.slug} />;
                            }}
                        />
                        <Route path="/sign-up" component={RegisterForm} exact />
                        <Route path="/sign-in" component={LoginForm} exact/>
                    </main>
                </Router>
            </Provider>
        )
    }

}
