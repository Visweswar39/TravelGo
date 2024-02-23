import axios from "axios";

export const getPlacesData = async (lang,lat, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`,
      {
        params: {
          latitude: lat ? lat : '17.7231276',
          longitude: lang? lang: '83.3012842',
          limit: '30',
          currency: 'USD',
          distance: '2',
          open_now: 'false',
          lunit: 'km',
          lang: 'en_US'
        },
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};