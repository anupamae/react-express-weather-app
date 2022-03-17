import React from 'react';
import Form from './Form';
import WeatherCard from './WeatherCard';
import { ICityItem } from '../App';
import './CityList.css';

interface ICityListProps {
  cityList: ICityItem[],
  updateCityList: (list: ICityItem[]) => void
}

const CityList = (props: ICityListProps) => {

  const addCity = (city: ICityItem) => {
    // Discard if duplicate items.
    if (props.cityList.some(value => value.name.toLowerCase() === city.name.toLowerCase())) {
      return;
    }
    props.cityList.unshift(city);
    props.updateCityList(props.cityList);
  }

  const removeCity = (cityId: string) => {
    const index = props.cityList.findIndex(value => value.id === cityId);
    props.cityList.splice(index, 1);
    props.updateCityList(props.cityList);
  }

  return (
    <React.Fragment>
      <Form addCity={addCity} />
      <section id='cityList' className='citylist'>
        {props.cityList.map(value => (
          <WeatherCard key={value.id} cityItem={value} removeCity={removeCity} />
        ))}
      </section>
    </React.Fragment>
  );
}

export default CityList;
