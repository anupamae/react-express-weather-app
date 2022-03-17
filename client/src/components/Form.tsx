import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ICityItem } from '../App';
import './Form.css';

interface IFormProps {
    addCity: (item: ICityItem) => void
}

const Form = (props: IFormProps) => {

  const [cityName, setCityName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.addCity({
      id: uuidv4(),
      name: cityName
    });
    setCityName('');
  }

  return (
    <form className='form' onSubmit={handleSubmit} autoComplete='off'>
      <fieldset className='form form__fieldset'>
        <input type='text' className='form form__input' placeholder='City Name' value={cityName} onChange={e => setCityName(e.target.value)} autoFocus required />
        <button type='submit' className='form form__button--submit' disabled={cityName.length < 1}>Add</button>
      </fieldset>
    </form>
  );
}

export default Form;
