import React from "react"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { notification } from "antd";
import * as actions from "../../store/actions"
import classes from "./profile-page.module.scss";


// eslint-disable-next-line react/prop-types,no-unused-vars
const ProfilePage = ({user, updateData}) => {
    const {register, handleSubmit, errors } = useForm();
    if (!user) {
        return <Redirect to="/"/>
    }
    // eslint-disable-next-line no-unused-vars,react/prop-types
    const { username, email, image } = user
    const onSubmit = data => {
        updateData(data)
        notification.success({
            message: "Updated user profile",
            placement: "bottomRight"
        })
    };
    return (
        <article className={classes.profile__container}>
            <form className={classes.profile__form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={classes.profile__title}>Edit profile</h3>

                <label className={classes.profile__label}>
                    <h5 className={classes.label__title}>Username</h5>
                    <input className={classes.profile__input} name="username" defaultValue={username} ref={register({
                        minLength: 3,
                        maxLength: 20,
                        required: true,
                    })} placeholder="Username"/>
                    {errors.username?.type === "required" &&
                    <span className={classes.profile__error}>This field is required.</span>}
                    {errors.username?.type === "minLength" && <span className={classes.profile__error}>Your new username needs to be at least 3 characters.</span>}
                    {errors.username?.type === "maxLength" &&
                    <span className={classes.profile__error}>Your new username is long (max 20 characters).</span>}
                </label>

                <label className={classes.profile__label}>
                    <h5 className={classes.label__title}>Email address</h5>
                    <input className={classes.profile__input} name="email" defaultValue={email} placeholder="Email address"
                           ref={register(
                               {
                                   required: true,
                                   pattern: /^[^@]+@[^@.]+\.[^@]+$/,
                               })}/>
                    {errors.email?.type === "pattern" &&
                    <span className={classes.profile__error}>Type correct email!</span>}
                    {errors.email?.type === "required" &&
                    <span className={classes.profile__error}>This field is required.</span>}
                </label>

                <label className={classes.profile__label}>
                    <h5 className={classes.label__title}>New password</h5>
                    <input className={classes.profile__input} defaultValue='' name="password" type='password'
                           placeholder="Password" ref={register(
                        {required: true, minLength: 8, maxLength: 40})}/>
                    {errors.password?.type === "required" &&
                    <span className={classes.profile__error}>This field is required.</span>}
                    {errors.password?.type === "minLength" && <span className={classes.profile__error}>Your new password needs to be at least 8 characters.</span>}
                </label>

                <label className={classes.profile__label}>
                    <h5 className={classes.label__title}>Avatar image (url)</h5>
                    <input className={classes.profile__input} defaultValue={image} name="image"
                           placeholder="Avatar image" ref={register(
                        {
                            required: true,
                            // eslint-disable-next-line no-useless-escape
                            pattern: /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
                        })}
                    />
                    {errors.image?.type === "pattern" &&
                    <span className={classes.profile__error}>This field must be URL.</span>}
                    {errors.image?.type === "required" &&
                    <span className={classes.profile__error}>This field is required.</span>}
                </label>

                <input className={classes.profile__submit} type="submit" value="Save"/>
            </form>
        </article>
    )
}

const mapStateToProps = (state) => state.user

export default connect(mapStateToProps, actions)(ProfilePage)