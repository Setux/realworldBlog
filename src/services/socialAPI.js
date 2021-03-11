export default class RealworldService {
  async getArticles(page) {
    const offset = (page - 1) * 5;
    const response = await fetch(`https://conduit.productionready.io/api/articles?limit=5&offset=${offset}`);
    const data = await response.json()
    return data
  }

  async getArticle(slug) {
    const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`);
    const data = await response.json();
    return data.article;
  }

  async register(userData) {
    const { username, email, password } = userData
    const user = {username, email, password}
    const returnedRes = await fetch('https://conduit.productionready.io/api/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({user})
    })
    const returnedData = await returnedRes.json()
    return returnedData.user
  }

  async login(user) {
    const returnedRes = await fetch('https://conduit.productionready.io/api/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({user})
    })
    const returnedData = await returnedRes.json()
    return returnedData.user
  }

  async getUserData() {
    const token = localStorage.getItem("data")
    const returnedRes = await fetch('https://conduit.productionready.io/api/user', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    const returnedData = await returnedRes.json()
    return returnedData.user
  }
}
