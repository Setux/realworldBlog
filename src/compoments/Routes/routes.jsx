import React from "react"
import { useStore } from "react-redux";
import {Redirect, Route} from "react-router-dom"
import ArticleList from "../ArticleList";
import FullArticle from "../ArticleList/FullArticle";
import EditArticle from "../EditArticle";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import ProfilePage from "../ProfilePage";
import CreateArticle from "../CreateArticle";

const Routes = () => {
    const store = useStore()
    return (
        <>
            <Route path="/" render = {() => {
                const data = store.getState();
                const { user } = data;
                if (user.user !== null) {
                    return <ArticleList user={user.user.username} />;
                }
                return <ArticleList />
            }} exact />
            <Route path="/articles" render = {() => {
                const data = store.getState();
                const { user } = data;
                if (user.user !== null) {
                    return <ArticleList user={user.user.username} />;
                }
                return <ArticleList />
            }} exact />
            <Route
                path="/articles/:slug"
                render={({ match }) => {
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
            </>
    )
}

export default Routes