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
            'X-RapidAPI-Key': '6335173a14mshc04a732230a4452p1e8360jsnb2dd49d74a42',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};