import React, { useState } from 'react';
import CityList from './components/CityList';
import './App.css';

export interface ICityItem {
  id: string,
  name: string
}

function App() {

  const [state, setState] = useState(() => {
    try {
      const list = JSON.parse(localStorage.getItem('cityList') || '') as ICityItem[];
      if (list) {
        return { items: list };
      }
    } catch (_) {
    }
    return { items: [] };
  });

  const updateCityList = (list: ICityItem[]) => {
    setState({ items: list });
    localStorage.setItem('cityList', JSON.stringify(list));
  }

  return (
    <React.Fragment>
      <Header />
      <CityList cityList={state.items} updateCityList={updateCityList} />
      <Footer />
    </React.Fragment>
  );
}

const Header = () => {
  return (
    <header className='header'>
      <h1 className='header header__h1'>Weather App</h1>
    </header>
  );
}

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer footer__p'>&copy; Anupama Ellath</p>
    </footer>
  );
}

export default App;
