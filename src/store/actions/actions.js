import { nanoid } from 'nanoid';
import { CONFIRM_RULES, POSTED, ON_LOAD, SET_ARTICLE, SET_PAGE, SET_DATA,
  CLOSE_ERROR, DELETED, LOGIN_USER, LOGOUT_USER, USER_ERROR } from "../../assets/constants/constants";
import RealworldService from "../../services/socialAPI"

const getData = async (page) => {
  const response = await RealworldService.getArticles(page);
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
  const data = await RealworldService.getArticle(slug);
  return data;
};
const setArticles = (data) => ({
  type: SET_DATA,
  payload: data,
});
const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});
const setArticle = (data) => ({
  type: SET_ARTICLE,
  payload: data,
});
const posted = () => ({
  type: POSTED,
});
const onDelete = () => ({
  type: DELETED,
});
export const confirmRules = () => ({
  type: CONFIRM_RULES
})
const onLoad = () => ({
  type: ON_LOAD,
});

const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});
const userError = (data) => ({
  type: USER_ERROR,
  payload: data,
});

export const closeError = () => ({
  type: CLOSE_ERROR,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
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
  const data = await RealworldService.register(userData);
  if (data.errors) {
    dispatch(userError(data));
    return false;
  }
  const { username, email, image, token } = data;
  localStorage.setItem('data', token);
  const user = { username, email, image };
  dispatch(loginUser(user));
  return true;
};
export const loginTo = (userData) => async (dispatch) => {
  dispatch(closeError())
  const data = await RealworldService.login(userData);
  if (!data) {
    dispatch(userError());
  } else {
    const { username, email, image, token } = data;
    localStorage.setItem('data', token);
    const user = { username, email, image };
    dispatch(loginUser(user));
  }
};
export const getUser = () => async (dispatch) => {
  const data = await RealworldService.getUserData();
  if (!data) {
    return false;
  }
  const { username, email, image } = data;
  const user = { username, email, image };
  dispatch(loginUser(user));
  return true;
};

export const updateData = (userData) => async (dispatch) => {
  dispatch(closeError());
  const data = await RealworldService.updateUser(userData);
  if (data.errors) {
    dispatch(userError(data));
    return false;
  }
  const { username, email, image } = data;
  const user = { username, email, image };
  dispatch(loginUser(user));
  return true;
};
export const postData = (articleData) => async (dispatch) => {
  const data = await RealworldService.postArticle(articleData);
  dispatch(setArticle(data));
  dispatch(posted());
};
export const editArticle = (article, slug) => async (dispatch) => {
  const data = await RealworldService.editArticle(article, slug);
  dispatch(setArticle(data));
  dispatch(posted());
};
export const deleteArticle = (slug) => async (dispatch) => {
  await RealworldService.deleteArticle(slug);
  dispatch(onDelete());
};

export const like = (slug) => async (dispatch) => {
  const data = await RealworldService.likePost(slug);
  dispatch(setArticle(data));
};
export const unlike = (slug) => async (dispatch) => {
  const data = await RealworldService.unlikePost(slug);
  dispatch(setArticle(data));
};
export const likeMain = (slug, page) => async (dispatch) => {
  await RealworldService.likePost(slug);
  const data = await getData(page);
  dispatch(setPage(page));
  dispatch(setArticles(data));
};
export const unlikeMain = (slug, page) => async (dispatch) => {
  await RealworldService.unlikePost(slug);
  const data = await getData(page);
  dispatch(setPage(page));
  dispatch(setArticles(data));
};