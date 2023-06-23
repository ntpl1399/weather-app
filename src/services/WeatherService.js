import axios from 'axios';

const API_KEY = '6dba95d0cd8845af92b144849230706';

const WeatherService = {
  getWeatherForecast: async (selectedState) => {
    try {
        console.log('seleectedState :' + selectedState.selectedState);
        const state= selectedState.selectedState;
        console.log(`https://api.weatherapi.com/v1/forecast.json?key=6dba95d0cd8845af92b144849230706&q=${selectedState.selectedState}'&days=7`);
        const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${state}&days=7`); 
           return response.data.forecast;        
    }
    catch(error) {
        console.error('Error fetching weather data:', error);
        return [];
      }   
  },
};

export default WeatherService;
