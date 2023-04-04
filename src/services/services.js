import { useHttp } from '../hooks/http.hook';

const usePortalService = () => {
  const { loading, request, error } = useHttp();

  const _apiBase = 'https://mmo-games.p.rapidapi.com';

  const _options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
    },
  };

  const getNews = async () => {
    const res = await request(`${_apiBase}/latestnews`, _options);
    return res;
  };

  const getCategory = async (category) => {
    const res = await request(
      `${_apiBase}/games?category=${category}`,
      _options
    );

    return res;
  };

  const getAllGames = async (games) => {
    const res = await request(`${_apiBase}/games?platform=${games}`, _options);
    return res;
  };

  const getSpecificGame = async (game) => {
    if (typeof game !== 'number') return;

    const res = await request(`${_apiBase}/game?id=${game}`, _options);
    return res;
  };

  const getFilterdGame = async (platform, category, sortBy) => {
    const res = await request(
      `${_apiBase}/games?platform=${platform}&category=${category}&sort-by=${sortBy}`,
      _options
    );

    return res;
  };
  return {
    loading,
    error,
    getFilterdGame,
    getSpecificGame,
    getAllGames,
    getCategory,
    getNews,
  };
};

export default usePortalService;
