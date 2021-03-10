import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { MessageFilled } from '@ant-design/icons';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { nanoid } from 'nanoid';
import PropTypes from "prop-types"
import classes from './full-article.module.scss';
import * as actions from '../../../store/actions';
import liked from './liked.svg';
import unliked from './unliked.svg';
import defaultAvatar from './default_avatar.jpg';

const FullArticle = ({ slug, selectedArticle, getArticle }) => {
  useEffect(() => {
    getArticle(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (selectedArticle !== null) {
    const { body, title, favorited, favoritesCount, createdAt, tagList, author, description } = selectedArticle;
    const createdTime = format(new Date(createdAt), 'MMMM d, yyyy');
    const { username, image } = author;

    const tags = tagList.map((el) => (
      <div key={nanoid(4)} className={classes.tags__item}>
        {el}
      </div>
    ));

    let likeImage = null;
    if (!favorited) {
      likeImage = <img className={classes.like} src={unliked} alt="Like this post" />;
    } else {
      likeImage = <img className={classes.like} src={liked} alt="Unlike this post" />;
    }

    let avatarImage = null;
    if (image) {
      avatarImage = image;
    } else {
      avatarImage = defaultAvatar;
    }

    return (
      <article className={classes.article__container}>
        <header className={classes.article__header}>
          <div className={classes['article__header--info']}>
            <div className={classes.info__text}>
              <span className={classes['text--title']}>{title}</span>
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
        <div className={classes.article__description}>{description}</div>
        <main className={classes.article__body}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </main>
      </article>
    );
  }
  const spinIcon = <MessageFilled spin style={{ fontSize: 36 }} />;
  return (
      <div className={classes.loading}>
        <Spin indicator={spinIcon} size="large" />
      </div>
  )
};

FullArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  selectedArticle: PropTypes.objectOf().isRequired,
  getArticle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => state.articles;

export default connect(mapStateToProps, actions)(FullArticle);
