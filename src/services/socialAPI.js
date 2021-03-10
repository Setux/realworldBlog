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
}
