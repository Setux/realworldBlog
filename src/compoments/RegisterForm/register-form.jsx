import React from "react"
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import classes from "./register-form.module.scss"

const RegisterForm = () => {
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, watch, errors, getValues } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <article className={classes.register__container}>
            <form className={classes.register__form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={classes.register__title}>Create new account</h3>
                {/* register your input into the hook by invoking the "register" function */}
                <label className={classes.register__label}>
                    <h5 className={classes.label__title}>Username</h5>
                    <input className={classes.register__input} name="username" ref={register({
                        minLength: 3,
                        maxLength: 20,
                        required: true,
                    })} placeholder="Username" />
                </label>

                {/* include validation with required or other standard HTML validation rules */}
                <label className={classes.register__label}>
                    <h5 className={classes.label__title}>Email address</h5>
                    <input className={classes.register__input} name="mail" placeholder="Email address" ref={register(
                        { required: true,
                            pattern: /^[^@]+@[^@.]+\.[^@]+$/,
                        })} />
                    {errors.mail && <span>Type correct email!</span>}
                </label>

                <label className={classes.register__label}>
                    <h5 className={classes.label__title}>Password</h5>
                    <input className={classes.register__input} name="password" placeholder="Password" ref={register(
                        { required: true, minLength: 8, maxLength: 40 })} />
                    {errors.password && <span>This field is required</span>}
                </label>

                <label className={classes.register__label}>
                    <h5 className={classes.label__title}>Repeat password</h5>
                    <input className={classes.register__input} name="confirmPassword" placeholder="Password" ref={register(
                        { required: true, minLength: 8, maxLength: 40, validate: {
                            equal: value => getValues("password") === value
                            }  })}
                    />
                </label>
                {/* errors will return when field validation fails  */}
                {errors.confirmPassword && <span>Not correct!</span>}

                <input className={classes.register__submit} type="submit" value="Submit" />
            </form>
        </article>
    )
}

export default RegisterForm