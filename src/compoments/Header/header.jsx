import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import classes from './header.module.scss';
import {logoutUser} from "../../store/actions";
import defaultAvatar from "./default-avatar.svg"

const setAvatarImage = (image) => {
    if (image) {
        return image
    }
    return defaultAvatar
}

// eslint-disable-next-line react/prop-types
const Header = ({user, isLoggedIn, logout}) => {
    if (!isLoggedIn) {
        return (
            <div className={classes.header}>
                <Link to="/" className={classes.header__link}>
                    Realworld Blog
                </Link>
                <div className={classes.header__log}>
                    <Link to="/sign-in" className={classes['header__log--signin']}>
                        Sign in
                    </Link>
                    <Link to="/sign-up" className={classes['header__log--signup']}>
                        Sign up
                    </Link>
                </div>
            </div>
        )
    }
    const handleClick = (event) => {
        event.preventDefault()
        localStorage.removeItem("data")
        logout()
    }

    // eslint-disable-next-line react/prop-types
    const {username, image} = user
    const avatarImage = setAvatarImage(image)
    return (
        <div className={classes.header}>
            <Link to="/" className={classes.header__link}>
                Realworld Blog
            </Link>
            <div className={classes.header__logged}>
                <Link className={classes['header__logged--article']} to="/new-article">
                    Create article
                </Link>
                <Link className={classes['header__logged--profile']} to='/profile'>
                    {username}
                    <img className={classes['header__logged--avatar']} src={avatarImage} alt="Your avatar"/>
                </Link>
                <Link to="/" type="button" onClick={handleClick} className={classes['header__logged--logout']}>
                    Log out
                </Link>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => state.user
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
