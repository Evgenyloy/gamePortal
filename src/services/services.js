class PortalService {
  _news = 'https://mmo-games.p.rapidapi.com/latestnews';

  _mmo = 'https://mmo-games.p.rapidapi.com/games?category=';
  _allGames = 'https://mmo-games.p.rapidapi.com/games';
  _specificGame = 'https://mmo-games.p.rapidapi.com/game?id=';

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
    const res = await this.getResource(this._news);
    return res;
  };

  getCategory = async (category) => {
    const res = await this.getResource(this._mmo + category);

    return res;
  };

  getAllGames = async () => {
    const res = await this.getResource(this._allGames);
    return res;
  };

  getSpecificGame = async (game) => {
    const res = await this.getResource(this._specificGame + game);
    return res;
  };

  _transformData = (item) => {
    return {
      id: item.id,
      thumbnail: item.thumbnail,
      short_description: item.short_description,
      title: item.title,
      developer: item.developer,
      genre: item.genre,
      platform: item.platform,
      release_date: item.release_date,
      publisher: item.publisher,
      grapogics: item.minimum_system_requirements.grapogics,
      memory: item.minimum_system_requirements.memory,
      os: item.minimum_system_requirements.os,
      processor: item.minimum_system_requirements.processor,
      storage: item.minimum_system_requirements.storage,
    };
  };
}

export default PortalService;
