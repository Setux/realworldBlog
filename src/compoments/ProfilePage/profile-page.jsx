import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import UserAlert from "../Alert";
import * as actions from '../../store/actions/actions';
import classes from './profile-page.module.scss';

const ProfilePage = ({ user, errorsList, updateData, closeError }) => {
  const { register, handleSubmit, errors } = useForm();
  if (!user) {
    return <Redirect to="/" />;
  }
  const { username, email, image } = user;
  const onSubmit = async (data) => {
    if (data.password === "") {
      // eslint-disable-next-line no-shadow
      const { username, email, image } = data
      const newData = { username, email, image}
      const isSuccess = await updateData(newData);
      if (isSuccess) {
        notification.success({
          message: 'Updated user profile',
          placement: 'bottomRight',
        });
      }
    } else {
      const isSuccess = await updateData(data);
      if (isSuccess) {
        notification.success({
          message: 'Updated user profile',
          placement: 'bottomRight',
        });
      }
    }
  };
  const profilePage = (
    <>
      <form className={classes.profile__form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={classes.profile__title}>Edit profile</h3>

        <label className={classes.profile__label}>
          <h5 className={classes.label__title}>Username</h5>
          <input
            className={classes.profile__input}
            name="username"
            defaultValue={username}
            ref={register({
              minLength: 3,
              maxLength: 20,
              required: true,
            })}
            placeholder="Username"
          />
          {errors.username?.type === 'required' && (
            <span className={classes.profile__error}>This field is required.</span>
          )}
          {errors.username?.type === 'minLength' && (
            <span className={classes.profile__error}>Your new username needs to be at least 3 characters.</span>
          )}
          {errors.username?.type === 'maxLength' && (
            <span className={classes.profile__error}>Your new username is long (max 20 characters).</span>
          )}
        </label>

        <label className={classes.profile__label}>
          <h5 className={classes.label__title}>Email address</h5>
          <input
            className={classes.profile__input}
            name="email"
            defaultValue={email}
            placeholder="Email address"
            ref={register({
              required: true,
              pattern: /^[^@]+@[^@.]+\.[^@]+$/,
            })}
          />
          {errors.email?.type === 'pattern' && <span className={classes.profile__error}>Type correct email!</span>}
          {errors.email?.type === 'required' && <span className={classes.profile__error}>This field is required.</span>}
        </label>

        <label className={classes.profile__label}>
          <h5 className={classes.label__title}>New password</h5>
          <input
            className={classes.profile__input}
            defaultValue=""
            name="password"
            type="password"
            placeholder="Password"
            ref={register({ minLength: 8, maxLength: 40 })}
          />
          {errors.password?.type === 'minLength' && (
            <span className={classes.profile__error}>Your new password needs to be at least 8 characters.</span>
          )}
        </label>

        <label className={classes.profile__label}>
          <h5 className={classes.label__title}>Avatar image (url)</h5>
          <input
            className={classes.profile__input}
            defaultValue={image}
            name="image"
            placeholder="Avatar image"
            ref={register({
              required: true,
              pattern: /^https?:\/\/.*\.(?:jpe?g|gif|png)$/gi,
            })}
          />
          {errors.image?.type === 'pattern' && (
            <span className={classes.profile__error}>This field must be correct URL.</span>
          )}
          {errors.image?.type === 'required' && <span className={classes.profile__error}>This field is required.</span>}
        </label>

        <input className={classes.profile__submit} type="submit" value="Save" />
      </form>
    </>
  );
  let alert = null;
  if (errorsList !== null) {
    // eslint-disable-next-line no-shadow
    const { errors } = errorsList;
    alert = UserAlert(errors, closeError)
    return (
        <article className={classes.profile__container}>
          {alert}
          {profilePage}
        </article>
    );
  }

  return <article className={classes.profile__container}>{profilePage}</article>;
};

ProfilePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  updateData: PropTypes.func.isRequired,
  errorsList: PropTypes.objectOf(PropTypes.any),
  closeError: PropTypes.func.isRequired,
};
ProfilePage.defaultProps = {
  user: null,
  errorsList: null,
};

const mapStateToProps = (state) => state.user;

export default connect(mapStateToProps, actions)(ProfilePage);
