class PortalService {
  _apiBase = 'https://mmo-games.p.rapidapi.com';

  _options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '91b58b67a8msh2bd4b616724fea5p1339a3jsn28cd7698ccec',
      'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
    },
  };

  getResource = async (url) => {
    let res = await fetch(url, this._options);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getNews = async () => {
    const res = await this.getResource(`${this._apiBase}/latestnews`);
    return res;
  };

  getCategory = async (category) => {
    const res = await this.getResource(
      `${this._apiBase}/games?category=${category}`
    );

    return res;
  };

  getAllGames = async (games) => {
    const res = await this.getResource(
      `${this._apiBase}/games?platform=${games}`
    );
    return res;
  };

  getSpecificGame = async (game) => {
    if (typeof game !== 'number') return;

    const res = await this.getResource(`${this._apiBase}/game?id=${game}`);
    return res;
  };

  getFilterdGame = async (platform, category, sortBy) => {
    const res = await this.getResource(
      `${this._apiBase}/games?platform=${platform}&category=${category}&sort-by=${sortBy}`
    );

    return res;
  };
}

export default PortalService;
