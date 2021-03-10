import { combineReducers } from 'redux';

const initialArticlesState = {
  data: [],
  selectedArticle: null,
  totalArticles: null,
  currentPage: null,
  isLoading: false,
};

const articlesReducer = (state = initialArticlesState, { type, payload }) => {
  const { isLoading } = state;
  switch (type) {
    case 'SET_DATA':
      return {
        ...state,
        data: payload.articles,
        selectedArticle: null,
        totalArticles: payload.articlesCount,
      };
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: payload,
      };
    case 'SET_ARTICLE':
      return {
        ...state,
        data: [],
        selectedArticle: payload,
      };
    case 'ON_LOAD':
      return {
        ...state,
        isLoading: !isLoading,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ articles: articlesReducer });

export default rootReducer;
