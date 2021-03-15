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
  return data;
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
const posted = () => ({
  type: 'POSTED',
});
const onDelete = () => ({
  type: 'DELETED',
});

const onLoad = () => ({
  type: 'ON_LOAD',
});

const loginUser = (user) => ({
  type: 'LOGIN_USER',
  payload: user,
});
const regError = (data) => ({
  type: 'REG_ERROR',
  payload: data,
});
const loginError = () => ({
  type: 'LOGIN_ERROR',
});
const updateError = (data) => ({
  type: 'UPDATE_ERROR',
  payload: data,
});
export const closeError = () => ({
  type: 'CLOSE_ERROR',
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER',
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

export const registerUser = (userData) => async (dispatch) => {
  dispatch(closeError());
  const data = await realworldAPI.register(userData);
  if (data !== null && data.errors !== undefined) {
    dispatch(regError(data));
    return false;
  }
  const { username, email, image, token } = data;
  localStorage.setItem('data', token);
  const user = { username, email, image };
  dispatch(loginUser(user));
  return true;
};
export const loginTo = (userData) => async (dispatch) => {
  const data = await realworldAPI.login(userData);
  if (data === undefined) {
    dispatch(loginError());
  } else {
    const { username, email, image, token } = data;
    localStorage.setItem('data', token);
    const user = { username, email, image };
    dispatch(loginUser(user));
  }
};
export const getUser = () => async (dispatch) => {
  const data = await realworldAPI.getUserData();
  if (data === null) {
    return false;
  }
  const { username, email, image } = data;
  const user = { username, email, image };
  dispatch(loginUser(user));
  return true;
};

export const updateData = (userData) => async (dispatch) => {
  dispatch(closeError());
  const data = await realworldAPI.updateUser(userData);
  if (data !== null && data.errors !== undefined) {
    dispatch(updateError(data));
    return false;
  }
  const { username, email, image } = data;
  const user = { username, email, image };
  dispatch(loginUser(user));
  return true;
};
export const postData = (articleData) => async (dispatch) => {
  const data = await realworldAPI.postArticle(articleData);
  dispatch(setArticle(data));
  dispatch(posted());
};
export const editArticle = (article, slug) => async (dispatch) => {
  const data = await realworldAPI.editArticle(article, slug);
  dispatch(setArticle(data));
  dispatch(posted());
};
export const deleteArticle = (slug) => async (dispatch) => {
  await realworldAPI.deleteArticle(slug);
  dispatch(onDelete());
};

export const like = (slug) => async (dispatch) => {
  const data = await realworldAPI.likePost(slug);
  dispatch(setArticle(data));
};
export const unlike = (slug) => async (dispatch) => {
  const data = await realworldAPI.unlikePost(slug);
  dispatch(setArticle(data));
};
