import React from "react"
import { useForm } from "react-hook-form";
import { connect } from "react-redux"
import {notification} from "antd";
import {Redirect} from "react-router-dom";
import * as actions from "../../store/actions"
import classes from "./create-article.module.scss";

// eslint-disable-next-line react/prop-types
const CreateArticle = ({selectedArticle, isPosted, postData}) => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => {
        postData(data)
        notification.success({
            message: "Your article has been posted!",
            placement: "bottomRight"
        })
    };
    if (isPosted) {
        // eslint-disable-next-line react/prop-types
        const { slug } = selectedArticle
        return <Redirect to={`/articles/${slug}`}/>
    }
    return (
        <article className={classes.narticle__container}>
            <form className={classes.narticle__form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={classes.narticle__title}>Create new article</h3>

                <label className={classes.narticle__label}>
                    <h5 className={classes.label__title}>Title</h5>
                    <input className={classes.narticle__input} name="title" ref={register({
                        required: true,
                    })} placeholder="Title"/>
                    {errors.title?.type === "required" &&
                    <span className={classes.narticle__error}>This field is required.</span>}
                </label>

                <label className={classes.narticle__label}>
                    <h5 className={classes.label__title}>Short description</h5>
                    <input className={classes.narticle__input} name="description" placeholder="Description"
                           ref={register(
                               {
                                   required: true,
                               })}/>
                    {errors.description?.type === "required" &&
                    <span className={classes.narticle__error}>This field is required.</span>}
                </label>

                <label className={classes.narticle__label}>
                    <h5 className={classes.label__title}>Text</h5>
                    <textarea className={classes.narticle__textarea} name="body"
                           placeholder="Text" ref={register(
                        {required: true})}/>
                    {errors.body?.type === "required" &&
                    <span className={classes.narticle__error}>This field is required.</span>}
                </label>
                <input className={classes.narticle__submit} type="submit" value="Send"/>
            </form>
        </article>
    )
}

const mapStateToProps = (state) => state.articles

export default connect(mapStateToProps, actions)(CreateArticle)