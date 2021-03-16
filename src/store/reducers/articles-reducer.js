import { ON_LOAD, SET_ARTICLE, SET_DATA, SET_PAGE, POSTED, DELETED } from '../../assets/constants/constants';

const initialState = {
  data: [],
  selectedArticle: null,
  totalArticles: null,
  currentPage: null,
  isLoading: false,
  isPosted: false,
  isDeleted: false,
};

export default function articlesReducer(state = initialState, { type, payload }) {
  const { isLoading } = state;
  switch (type) {
    case SET_DATA:
      return {
        ...state,
        data: payload.articles,
        selectedArticle: null,
        totalArticles: payload.articlesCount,
        isDeleted: false,
        isPosted: false,
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case SET_ARTICLE:
      return {
        ...state,
        data: [],
        selectedArticle: payload,
        isPosted: false,
      };
    case ON_LOAD:
      return {
        ...state,
        isLoading: !isLoading,
        isPosted: false,
      };
    case POSTED:
      return {
        ...state,
        isPosted: true,
      };
    case DELETED:
      return {
        ...state,
        isDeleted: true,
      };
    default:
      return state;
  }
}
