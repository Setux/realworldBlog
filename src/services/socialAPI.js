import { UNPROCESSABLE_REQUEST } from "../assets/constants/constants";

export default class RealworldService {
  static async getArticles(page) {
    const token = localStorage.getItem('data');
    const offset = (page - 1) * 10;
    const response = token ?
        await fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=${offset}`) :
        await fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=${offset}`,
            {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    const data = await response.json();
    return data;
  }

  static async getArticle(slug) {
    const token = localStorage.getItem('data');
    const response = token ?
        await fetch(`https://conduit.productionready.io/api/articles/${slug}`) :
        await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`,
          },
        })
    const data = await response.json();
    return data.article;
  }

  static async register(userData) {
    const { username, email, password } = userData;
    const user = { username, email, password };
    const returnedRes = await fetch('https://conduit.productionready.io/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ user }),
    });
    if (returnedRes.status === UNPROCESSABLE_REQUEST) {
      const errorMessage = await returnedRes.json();
      return errorMessage;
    }
    const returnedData = await returnedRes.json();
    return returnedData.user;
  }

  static async login(user) {
    const returnedRes = await fetch('https://conduit.productionready.io/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ user }),
    });
    const returnedData = await returnedRes.json();
    return returnedData.user;
  }

  static async getUserData() {
    const token = localStorage.getItem('data');
    const returnedRes = await fetch('https://conduit.productionready.io/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    if (!returnedRes.ok) {
      return null;
    }
    const returnedData = await returnedRes.json();
    return returnedData.user;
  }

  static async updateUser(user) {
    const token = localStorage.getItem('data');
    const returnedRes = await fetch('https://conduit.productionready.io/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user }),
    });
    if (returnedRes.status === UNPROCESSABLE_REQUEST) {
      const errorMessage = await returnedRes.json();
      return errorMessage;
    }
    const returnedData = await returnedRes.json();
    return returnedData.user;
  }

  static async postArticle(article) {
    const token = localStorage.getItem('data');
    const returnedRes = await fetch('https://conduit.productionready.io/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article }),
    });
    const returnedData = await returnedRes.json();
    return returnedData.article;
  }

  static async editArticle(article, slug) {
    const token = localStorage.getItem('data');
    const returnedRes = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article }),
    });
    const returnedData = await returnedRes.json();
    return returnedData.article;
  }

  static async deleteArticle(slug) {
    const token = localStorage.getItem('data');
    await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  }

  static async likePost(slug) {
    const token = localStorage.getItem('data');
    const returnedRes = await fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const returnedData = await returnedRes.json();
    return returnedData.article;
  }

  static async unlikePost(slug) {
    const token = localStorage.getItem('data');
    const returnedRes = await fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const returnedData = await returnedRes.json();
    return returnedData.article;
  }
}

