import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import classes from './app.module.scss';
import Header from '../Header';
import FullArticle from '../ArticleList/FullArticle';
import ArticleList from '../ArticleList';
import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';
import ProfilePage from '../ProfilePage';
import CreateArticle from '../CreateArticle';
import EditArticle from '../EditArticle';

// eslint-disable-next-line react/prop-types
const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <main className={classes.main}>
        <Header />
        <Route path="/" component={ArticleList} exact />
        <Route path="/articles" component={ArticleList} exact />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            // eslint-disable-next-line react/prop-types
            const data = store.getState();
            const { user } = data;
            const { params } = match;
            if (user.user !== null) {
              return <FullArticle slug={params.slug} user={user.user.username} />;
            }
            return <FullArticle slug={params.slug} />;
          }}
          exact
        />
        <Route
          path="/articles/:slug/edit"
          render={({ match }) => {
            const { params } = match;
            return <EditArticle slug={params.slug} />;
          }}
          exact
        />
        <Route path="/sign-up" component={RegisterForm} exact />
        <Route path="/sign-in" component={LoginForm} exact />
        <Route path="/profile" component={ProfilePage} exact />
        <Route
          path="/new-article"
          render={() => {
            // eslint-disable-next-line react/prop-types
            const data = store.getState();
            const { user } = data;
            if (user.isLoggedIn) {
              return <CreateArticle />;
            }
            return <Redirect to="/articles" />;
          }}
          exact
        />
      </main>
    </Router>
  </Provider>
);

export default App;
