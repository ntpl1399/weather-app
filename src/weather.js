import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import WeatherService from './services/WeatherService';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [initialLoad, setinitialLoad] = useState(true);  
  const [selectedState, setSelectedState] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {              
        const response = await WeatherService.getWeatherForecast({selectedState});                
        setWeatherData(response.forecastday);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);    
    setinitialLoad(false);    
  };

  return (
    <div>      
    <div className="container py-5 h-100">
  <div className="row d-flex justify-content-center align-items-center h-100">
      <h3>Select a State:</h3>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">-- Select State --</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
      </select>
    </div>
 </div>
 


      {weatherData ? (
        <div className="weather-cards">
          {weatherData.map((day) => (
            <WeatherCard key={day.date} day={day} state={selectedState} />
          ))}
        </div>
      ) : !initialLoad ? (
        <p className='text-center'>Loading...</p>
      ) : <p></p> }
    </div>
  );
};

const WeatherCard = ({ day , state}) => {
  const date = new Date(day.date);  
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const temperature = day.day.avgtemp_c;
  const condition = day.day.condition.text;
  const CityName = state;
     
  return (
   
  
<section className="vh-25" style={{ backgroundColor: "#f5f6f7" }}>
<div className="container py-5 h-100">
  <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col-md-10 col-lg-8 col-xl-6">
      <div className="card bg-dark text-white" style={{ borderRadius: 40 }}>
        <div className="bg-image" style={{ borderRadius: 35 }}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
            className="card-img"
            alt="weather"
          />
          <div
            className="mask"
            style={{ backgroundColor: "rgba(190, 216, 232, .5)" }}
          />
        </div>
        <div className="card-img-overlay text-dark p-5">
          <h4 className="mb-2">{CityName} - {date.toLocaleDateString()}</h4>
          <h6 className="mb-0">{dayOfWeek}</h6>
          <p className="display-2 my-3">{temperature}°C</p>          
          <h5>{condition}</h5>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

  

  );
};

export default WeatherApp;
