import { useState, useEffect } from 'react';
import { ICityItem } from '../App';
import './WeatherCard.css';

interface IWeatherCardProps {
  cityItem: ICityItem,
  removeCity: (cityId: string) => void
}

interface IWeatherInfo {
  temp: string,
  feelsLike: string,
  minTemp: string,
  maxTemp: string,
  pressure: string,
  humidity: string,
  icon: string,
  desc: string
}

const WeatherCard = (props: IWeatherCardProps) => {

  const [weather, setWeather] = useState<IWeatherInfo>();

  const apiDomain = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : ''

  useEffect(() => {
    fetch(`${apiDomain}/api/weather?city=${props.cityItem.name}`, { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        setWeather({
          icon: response.icon,
          temp: response.temp,
          feelsLike: response.feelsLike,
          minTemp: response.minTemp,
          maxTemp: response.maxTemp,
          pressure: response.pressure,
          humidity: response.humidity,
          desc: response.desc
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.cityItem.name]);

  const handleKeyUp = (event: any) => {
    if (event.key === 'Delete') {
      props.removeCity(props.cityItem.id);
    }
  }

  return (
    <article onKeyUp={handleKeyUp} tabIndex={0} className='weather-card weather-card__article'>
      <img className='weather-card weather-card__img' src={weather?.icon || ''} alt={weather?.desc || 'API Error'} />
      <aside>
        <h4 className='weather-card weather-card__h4'>{props.cityItem.name}</h4>
        <h5 className='weather-card weather-card__h4'>{weather?.desc || '---'}</h5>
        <h5 className='weather-card weather-card__h5'>Temp: &nbsp;&nbsp;<b>{weather?.temp || '---'} &deg;C</b></h5>
        <h6 className='weather-card weather-card__h6'>Feels Like: &nbsp;&nbsp;<b>{weather?.feelsLike || '---'} &deg;C</b></h6>
        <h6 className='weather-card weather-card__h6'>Min Temp: &nbsp;&nbsp;<b>{weather?.minTemp || '---'} &deg;C</b></h6>
        <h6 className='weather-card weather-card__h6'>Max Temp: &nbsp; &nbsp;<b>{weather?.maxTemp || '---'} &deg;C</b></h6>
        <h6 className='weather-card weather-card__h6'>Pressure: &nbsp;&nbsp;<b>{weather?.pressure || '---'} hPa</b></h6>
        <h6 className='weather-card weather-card__h6'>Humidity: &nbsp;&nbsp;<b>{weather?.humidity || '---'} %</b></h6>
      </aside>
    </article>
  );
}

export default WeatherCard;
