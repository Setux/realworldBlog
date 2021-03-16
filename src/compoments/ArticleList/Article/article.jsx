import React from 'react';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import classes from './article.module.scss';
import * as actions from "../../../store/actions/actions"
import liked from './liked.svg';
import unliked from './unliked.svg';
import defaultAvatar from './default-avatar.svg';

const setAvatarImage = (image) => {
  if (image) {
    return image;
  }
  return defaultAvatar;
};
const setLikeImage = (user, favorited, slug, page, firstHandle, secondHandle) => {
  if (!favorited) {
    return (
        <button className={classes.article__button} onClick={() => firstHandle(slug, page)} type="button" disabled={!user}>
          <img className={classes.like} src={unliked} alt="Like this post" />
        </button>
    );
  }
  return (
      <button className={classes.article__button} onClick={() => secondHandle(slug, page)} type="button" disabled={!user}>
        <img className={classes.like} src={liked} alt="Unlike this post" />
      </button>
  );
}

const Article = (props) => {
  const { user, title, slug, page, tagList, createdAt, description, author, favoritesCount, favorited, likeMain, unlikeMain } = props;
  const createdTime = format(new Date(createdAt), 'MMMM d, yyyy');
  const tags = tagList.map((el) => (
    <div key={nanoid(4)} className={classes.tags__item}>
      {el}
    </div>
  ));
  const likeImage = setLikeImage(user, favorited, slug, page, likeMain, unlikeMain)
  const { username, image } = author;
  const avatarImage = setAvatarImage(image);
  return (
    <article className={classes.article__container}>
      <header className={classes.article__header}>
        <div className={classes['article__header--info']}>
          <div className={classes.info__text}>
            <Link to={`/articles/${slug}`} className={classes['text--title']}>
              {title}
            </Link>
            <div className={classes['text--likes']}>
              {likeImage}
              {favoritesCount}
            </div>
          </div>
          <div className={classes.info__tags}>{tags}</div>
        </div>
        <div className={classes['article__header--user']}>
          <div className={classes.user__user}>
            <div className={classes['user--nickname']}>{username}</div>
            <div className={classes['user--time']}>{createdTime}</div>
          </div>
          <img className={classes.user__avatar} alt={`${username}'s avatar`} src={avatarImage} />
        </div>
      </header>
      <main className={classes.article__description}>{description}</main>
    </article>
  );
};

Article.propTypes = {
  user: PropTypes.string,
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.objectOf(PropTypes.any).isRequired,
  favoritesCount: PropTypes.number.isRequired,
  favorited: PropTypes.bool.isRequired,
  likeMain: PropTypes.func.isRequired,
  unlikeMain: PropTypes.func.isRequired
};
Article.defaultProps = {
  user: null
}

export default connect(null, actions)(Article);
