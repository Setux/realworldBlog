import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination, Spin } from 'antd';
import { MessageFilled } from '@ant-design/icons';
import PropTypes from "prop-types"
import Article from './Article';
import classes from './article-list.module.scss';
import * as actions from '../../store/actions';

const ArticleList = ({ data, totalArticles, currentPage, isLoading, getArticles }) => {
  useEffect(() => {
    getArticles(1);
  }, [getArticles]);
  const elements = data.map((element) => {
    const { id, ...articleProps } = element;
    return (
      <li key={id} className={classes.article__item}>
        <Article {...articleProps} />
      </li>
    );
  });
  if (isLoading) {
    const spinIcon = <MessageFilled spin style={{ fontSize: 36 }} />;
    return (
      <div className={classes.loading}>
        <Spin indicator={spinIcon} size="large" />
      </div>
    );
  }
  return (
    <ul className={classes.article__list}>
      {elements}
      <Pagination
        onChange={(page) => getArticles(page)}
        className={classes.paginator}
        pageSize={5}
        defaultCurrent={currentPage}
        total={totalArticles}
        showSizeChanger={false}
      />
    </ul>
  );
};

ArticleList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalArticles: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getArticles: PropTypes.func.isRequired
}

const mapStateToProps = (state) => state.articles;

export default connect(mapStateToProps, actions)(ArticleList);
