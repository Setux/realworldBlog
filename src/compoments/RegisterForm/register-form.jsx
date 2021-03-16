import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import UserAlert from "../Alert";
import classes from './register-form.module.scss';

const RegisterForm = ({ errorsList, isLoggedIn, registerUser, closeError, confirmRules, confirmedRules }) => {
  const { register, handleSubmit, errors, getValues } = useForm();
  const onSubmit = (data) => registerUser(data);
  const regForm = (
    <>
      <form className={classes.register__form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={classes.register__title}>Create new account</h3>

        <label className={classes.register__label}>
          <h5 className={classes.label__title}>Username</h5>
          <input
            className={classes.register__input}
            name="username"
            ref={register({
              minLength: 3,
              maxLength: 20,
              required: true,
            })}
            placeholder="Username"
          />
          {errors.username?.type === 'required' && (
            <span className={classes.register__error}>This field is required.</span>
          )}
          {errors.username?.type === 'minLength' && (
            <span className={classes.register__error}>Your username needs to be at least 3 characters.</span>
          )}
          {errors.username?.type === 'maxLength' && (
            <span className={classes.register__error}>Your username is long (max 20 characters).</span>
          )}
        </label>

        <label className={classes.register__label}>
          <h5 className={classes.label__title}>Email address</h5>
          <input
            className={classes.register__input}
            name="email"
            placeholder="Email address"
            ref={register({
              required: true,
              pattern: /^[^@]+@[^@.]+\.[^@]+$/,
            })}
          />
          {errors.email?.type === 'pattern' &&
          <span className={classes.register__error}>Type correct email!</span>}
          {errors.email?.type === 'required' && (
            <span className={classes.register__error}>This field is required.</span>
          )}
        </label>

        <label className={classes.register__label}>
          <h5 className={classes.label__title}>Password</h5>
          <input
            className={classes.register__input}
            name="password"
            type="password"
            placeholder="Password"
            ref={register({ required: true, minLength: 8, maxLength: 40 })}
          />
          {errors.password?.type === 'required' && (
            <span className={classes.register__error}>This field is required.</span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className={classes.register__error}>Your password needs to be at least 8 characters.</span>
          )}
        </label>

        <label className={classes.register__label}>
          <h5 className={classes.label__title}>Repeat password</h5>
          <input
            className={classes.register__input}
            name="confirmPassword"
            type="password"
            placeholder="Password"
            ref={register({
              required: true,
              minLength: 8,
              maxLength: 40,
              validate: {
                equal: (value) => getValues('password') === value,
              },
            })}
          />
          {errors.confirmPassword?.type === 'validate' && (
            <span className={classes.register__error}>Passwords must match.</span>
          )}
          {errors.confirmPassword?.type === 'required' && (
            <span className={classes.register__error}>This field is required.</span>
          )}
        </label>
        <hr className={classes.register__line} />
        <label onChange={confirmRules} className={classes['register__label--check']}>
          <input
            className={classes['register__check--input']}
            type="checkbox"
            ref={register({ required: true })}
            name="confirmRules"
          />
          <span className={classes['register__check--span']}> </span>I agree to the processing of my personal
          information
        </label>
        {errors.confirmRules?.type === 'required' && (
          <span className={classes.register__error}>You must accept this term.</span>
        )}
        <input className={classes.register__submit} disabled={!confirmedRules} type="submit" value="Submit" />
      </form>
      <p className={classes.register__redirect}>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </>
  );
  if (errorsList !== null) {
    // eslint-disable-next-line no-shadow
    const { errors } = errorsList;
    const alert = UserAlert(errors, closeError);
    return (
      <article className={classes.register__container}>
        {alert}
        {regForm}
      </article>
    );
  }
  if (!isLoggedIn) {
    return <article className={classes.register__container}>{regForm}</article>;
  }
  return <Redirect to="/" />;
};

RegisterForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
  errorsList: PropTypes.objectOf(PropTypes.any),
  closeError: PropTypes.func.isRequired,
    confirmedRules: PropTypes.bool.isRequired,
    confirmRules: PropTypes.func.isRequired
};
RegisterForm.defaultProps = {
  errorsList: null,
};

const mapStateToProps = (state) => state.user;

export default connect(mapStateToProps, actions)(RegisterForm);
