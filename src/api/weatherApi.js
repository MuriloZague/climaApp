import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Substitua 'YOUR_API_KEY' pela sua chave de API :)

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'pt_BR'
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getIconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;