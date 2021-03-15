import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { nanoid } from 'nanoid';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';
import classes from './edit-article.module.scss';

const EditArticle = ({ slug, selectedArticle, isPosted, editArticle }) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    if (selectedArticle.tagList.length !== 0) {
      const { tagList } = selectedArticle;
      const tagsToState = tagList.map((tag) => ({ label: tag, isOwner: false, id: nanoid(3) }));
      tagsToState[tagsToState.length - 1].isOwner = true;
      setTags(tagsToState);
    } else {
      const startTag = [{ isOwner: true, id: nanoid(3) }];
      setTags(startTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { register, handleSubmit, errors } = useForm();
  const { title, description, body } = selectedArticle;
  const onSubmit = (data) => {
    editArticle(data, slug);
    notification.success({
      message: 'Your article has been edited!',
      placement: 'bottomRight',
    });
  };
  if (isPosted) {
    return <Redirect to={`/articles/${slug}`} />;
  }

  const addTag = () => {
    const ownerTag = tags.find((el) => el.isOwner);
    const ownerIndex = tags.findIndex((el) => el.isOwner);
    const oldOwner = { ...ownerTag, isOwner: false };
    const newTag = { isOwner: true, id: nanoid(3) };
    const newData = [...tags.slice(0, ownerIndex), oldOwner, newTag];
    setTags(newData);
  };

  const removeTag = (id) => {
    const deletedTag = tags.find((el) => el.id === id);
    if (deletedTag.isOwner) {
      const newPreOwner = tags[tags.length - 2];
      const newOwner = { ...newPreOwner, isOwner: true };
      const newData = [...tags.slice(0, tags.length - 2), newOwner];
      setTags(newData);
      return null;
    }
    const newData = tags.filter((el) => el.id !== id);
    setTags(newData);
    return null;
  };

  const tagsRender = tags.map((el, index) => {
    const { isOwner, id } = el;
    let addButton = null;
    let defaultVal = '';
    if (el.label !== undefined) {
      defaultVal = el.label;
    }
    if (isOwner) {
      addButton = (
        <button onClick={addTag} type="button" className={classes.tags__add}>
          Add tag
        </button>
      );
    }
    const removeButton = (
      <button type="button" onClick={() => removeTag(id)} className={classes.tags__remove}>
        Delete
      </button>
    );
    return (
      <li key={id} className={classes.tags__item}>
        <label className={classes.tags__label}>
          <input
            className={classes.tags__input}
            name={`tagList[${index}]`}
            defaultValue={defaultVal}
            placeholder="Tag"
            ref={register}
          />
        </label>
        {addButton}
        {removeButton}
      </li>
    );
  });
  return (
    <article className={classes.narticle__container}>
      <form className={classes.narticle__form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={classes.narticle__title}>Edit article</h3>

        <label className={classes.narticle__label}>
          <h5 className={classes.label__title}>Title</h5>
          <input
            className={classes.narticle__input}
            name="title"
            defaultValue={title}
            ref={register({
              required: true,
            })}
            placeholder="Title"
          />
          {errors.title?.type === 'required' && (
            <span className={classes.narticle__error}>This field is required.</span>
          )}
        </label>

        <label className={classes.narticle__label}>
          <h5 className={classes.label__title}>Short description</h5>
          <input
            className={classes.narticle__input}
            defaultValue={description}
            name="description"
            placeholder="Description"
            ref={register({
              required: true,
            })}
          />
          {errors.description?.type === 'required' && (
            <span className={classes.narticle__error}>This field is required.</span>
          )}
        </label>

        <label className={classes.narticle__label}>
          <h5 className={classes.label__title}>Text</h5>
          <textarea
            className={classes.narticle__textarea}
            defaultValue={body}
            name="body"
            placeholder="Text"
            ref={register({ required: true })}
          />
          {errors.body?.type === 'required' && <span className={classes.narticle__error}>This field is required.</span>}
        </label>
        <ul className={classes.tags__list}>{tagsRender}</ul>
        <input className={classes.narticle__submit} type="submit" value="Send" />
      </form>
    </article>
  );
};

EditArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  selectedArticle: PropTypes.objectOf(PropTypes.any).isRequired,
  isPosted: PropTypes.bool.isRequired,
  editArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state.articles;

export default connect(mapStateToProps, actions)(EditArticle);
