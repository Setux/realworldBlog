import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Modal, notification } from 'antd';
import { MessageFilled } from '@ant-design/icons';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import ExclamationCircleOutlined from '@ant-design/icons/lib/icons/ExclamationCircleOutlined';
import classes from './full-article.module.scss';
import * as actions from '../../../store/actions/actions';
import liked from './liked.svg';
import unliked from './unliked.svg';
import defaultAvatar from './default-avatar.svg';

const { confirm } = Modal;

const setAvatarImage = (image) => {
  if (image) {
    return image;
  }
  return defaultAvatar;
};
const setLikeImage = (user, favorited, slug, firstHandle, secondHandle) => {
  if (!favorited) {
    return (
        <button className={classes.article__button} onClick={() => firstHandle(slug)} type="button" disabled={!user}>
          <img className={classes.like} src={unliked} alt="Like this post" />
        </button>
    );
  }
     return (
        <button className={classes.article__button} onClick={() => secondHandle(slug)} type="button" disabled={!user}>
          <img className={classes.like} src={liked} alt="Unlike this post" />
        </button>
    );
}

const FullArticle = ({ slug, user, isDeleted, selectedArticle, getArticle, deleteArticle, like, unlike }) => {
  useEffect(() => {
    getArticle(slug);
  }, [ getArticle, slug ]);
  function showDeleteConfirm() {
    confirm({
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteArticle(slug);
        notification.success({
          message: 'Your article has been deleted!',
          placement: 'bottomRight',
        });
      },
      onCancel() {
        return null;
      },
    });
  }

  if (isDeleted) {
    return <Redirect to="/" />;
  }

  if (selectedArticle !== null) {
    const { body, title, favorited, favoritesCount, createdAt, tagList, author, description } = selectedArticle;
    const createdTime = format(new Date(createdAt), 'MMMM d, yyyy');
    const { username, image } = author;

    const tags = tagList.map((el) => (
      <div key={nanoid(4)} className={classes.tags__item}>
        {el}
      </div>
    ));

    const likeImage = setLikeImage(user, favorited, slug, like, unlike)

    const avatarImage = setAvatarImage(image);

    let articleSettings = null;
    if (username === user) {
      articleSettings = (
        <section className={classes.article__settings}>
          <button type="button" onClick={() => showDeleteConfirm()} className={classes.article__delete}>
            {' '}
            Delete{' '}
          </button>
          <Link className={classes.article__edit} to={(location) => `${location.pathname}/edit`}>
            Edit
          </Link>
        </section>
      );
    } else {
      articleSettings = null;
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
        <section className={classes.article__setting}>
          <div className={classes.article__description}>{description}</div>
          {articleSettings}
        </section>
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
  );
};

FullArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  selectedArticle: PropTypes.objectOf(PropTypes.any),
  getArticle: PropTypes.func.isRequired,
  user: PropTypes.string,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

FullArticle.defaultProps = {
  user: null,
  selectedArticle: null,
};

const mapStateToProps = (state) => state.articles;

export default connect(mapStateToProps, actions)(FullArticle);
