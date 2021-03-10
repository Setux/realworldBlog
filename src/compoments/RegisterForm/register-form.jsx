import React from "react"
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import classes from "./register-form.module.scss"

const RegisterForm = () => {
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <article className={classes.register__container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input name="username" defaultValue="test" ref={register} />

                {/* include validation with required or other standard HTML validation rules */}
                <input name="password" ref={register({ required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.password && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </article>
    )
}

export default RegisterForm