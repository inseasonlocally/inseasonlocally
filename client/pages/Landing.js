import React from 'react'
import { useState, useEffect } from 'react'
import LocationInput from '../components/LocationInput'
import Produce from '../components/Produce';
import { useUserContext } from '../hooks/useUserContext'
import { v4 as uuid } from 'uuid'
import { useProduceContext } from '../hooks/useProduceContext';

const Landing = () => {
  const [location, setLocation] = useState('');
  const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  // const [produce, setProduce] = useState([]);
  const { user } = useUserContext();
  const { dispatch } = useUserContext();
  const { produce, dispatchProduce } = useProduceContext();

  const displayProduce = async () => {
    const response = await fetch(`/api/produce/${user.location}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await response.json()
    console.log(json);
    if (response.ok) {
      //Update to store all produce results into an array
      // const items = json.map((el) => el)
      // setProduce(items);
      dispatchProduce({ type: 'SET_PRODUCE', payload: json });
    }
    // displayProduce(produce);
  }

  const handleSubmit = async () => {
    // console.log('is the submit to change location working?')
    const response = await fetch('/api/location', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        location: location
      })
    })

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'UPDATE_LOCATION', payload: json })
      displayProduce();
    }
  }

  useEffect(() => {
    displayProduce();
  }, [user]);

  return (
    <div>
      <div>Landing Page</div>
      <div>Your Current Location is: {user.location}</div>
      <div>
        <LocationInput
          label={<label>Change Current Location:</label>}
          value={location}
          onChange={setLocation}
          type="select"
          choices={states}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div>
        {produce ? produce.map((el) => (
          < Produce
            key={uuid()} name={el.name} img={el.img} location={user.location}
          />
        )) : <div></div>
        }
      </div>
    </div>
  )
}

export default Landing