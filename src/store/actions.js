import { nanoid } from 'nanoid';
import RealworldService from '../services/socialAPI';


const realworldAPI = new RealworldService();

const getData = async (page) => {
  const response = await realworldAPI.getArticles(page);
  const { articles, articlesCount } = response;
  const articlesWithID = articles.map((el) => ({
    ...el,
    id: nanoid(4),
  }));
  return {
    articles: articlesWithID,
    articlesCount,
  };
};
const getPage = async (slug) => {
  const data = await realworldAPI.getArticle(slug);
  return data
};
const setArticles = (data) => ({
  type: 'SET_DATA',
  payload: data,
});
const setPage = (page) => ({
  type: 'SET_PAGE',
  payload: page,
});
const setArticle = (data) => ({
  type: 'SET_ARTICLE',
  payload: data,
});

const onLoad = () => ({
  type: 'ON_LOAD',
});

export const getArticles = (page) => async (dispatch) => {
  dispatch(onLoad());
  const data = await getData(page);
  dispatch(setPage(page));
  dispatch(setArticles(data));
  dispatch(onLoad());
};

export const getArticle = (slug) => async (dispatch) => {
  dispatch(onLoad());
  const article = await getPage(slug);
  dispatch(setArticle(article));
  dispatch(onLoad());
};
