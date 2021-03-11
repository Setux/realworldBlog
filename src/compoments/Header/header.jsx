import React from 'react';
import { Link } from 'react-router-dom';
import classes from './header.module.scss';

const Header = () => (
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
);

export default Header;
