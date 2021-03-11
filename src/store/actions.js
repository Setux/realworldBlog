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

const loginUser = (user) => ({
  type: "LOGIN_USER",
  payload: user
})
const loginError = () => ({
  type: "LOGIN_ERROR"
})
export const closeError = () => ({
  type: "CLOSE_ERROR"
})

export const logoutUser = () => ({
  type: "LOGOUT_USER"
})

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
  const data = await realworldAPI.register(userData)
  const { username, email, image, token } = data
  localStorage.setItem("data", token)
  const user = { username, email, image }
  dispatch(loginUser(user))
}

export const loginTo = (userData) => async (dispatch) => {
  const data = await realworldAPI.login(userData)
  if (data === undefined) {
    dispatch(loginError())
  } else {
    const {username, email, image, token} = data
    localStorage.setItem("data", token)
    const user = {username, email, image}
    dispatch(loginUser(user))
  }
}

export const getUser = () => async (dispatch) => {
  const data = await realworldAPI.getUserData()
  const { username, email, image } = data
  const user = { username, email, image }
  dispatch(loginUser(user))
}

export const updateData = (userData) => async (dispatch) => {
  const data = await realworldAPI.updateUser(userData)
  const { username, email, image } = data
  const user = { username, email, image }
  dispatch(loginUser(user))
}

