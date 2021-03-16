import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/actions';
import classes from './login-form.module.scss';

const LoginForm = ({ isLoggedIn, isError, loginTo, closeError }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => loginTo(data);
  const loginForm = (
    <>
      <form className={classes.login__form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={classes.login__title}>Log in</h3>

        <label className={classes.login__label}>
          <h5 className={classes.label__title}>Email address</h5>
          <input
            className={classes.login__input}
            name="email"
            placeholder="Email address"
            ref={register({
              required: true,
              pattern: /^[^@]+@[^@.]+\.[^@]+$/,
            })}
          />
          {errors.email?.type === 'pattern' &&
          <span className={classes.login__error}>Type correct email!</span>}
          {errors.email?.type === 'required' &&
          <span className={classes.login__error}>This field is required.</span>}
        </label>

        <label className={classes.login__label}>
          <h5 className={classes.label__title}>Password</h5>
          <input
            className={classes.login__input}
            name="password"
            type="password"
            placeholder="Password"
            ref={register({ required: true, minLength: 8, maxLength: 40 })}
          />
          {errors.password?.type === 'required' && (
            <span className={classes.login__error}>This field is required.</span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className={classes.login__error}>Your password needs to be at least 8 characters.</span>
          )}
        </label>

        <hr className={classes.login__line} />
        <input className={classes.login__submit} type="submit" value="Login" />
      </form>
      <p className={classes.login__redirect}>
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </>
  );
  if (isError) {
    return (
      <article className={classes.login__container}>
        <Alert
          banner
          message="Error"
          description="Please, write correct email and password"
          type="error"
          showIcon
          closable
          onClose={closeError}
        />
        {loginForm}
      </article>
    );
  }

  if (!isLoggedIn) {
    return <article className={classes.login__container}>{loginForm}</article>;
  }
  return <Redirect to="/" />;
};

LoginForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  loginTo: PropTypes.func.isRequired,
  closeError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state.user;

export default connect(mapStateToProps, actions)(LoginForm);
