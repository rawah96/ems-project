import React, { useState } from "react";
// import React, { useState, Component } from 'react'; 
import "./InputPage.css";
import isEmpty from 'lodash/isEmpty';
import { useStateValue } from '../Context/StateProvider';
import AutoComplete from "../Maps/AutoComplete"
import { actionTypes } from "../Context/reducer";
import * as errorMessage from './error.js';

function InputPage() {
  const [{ hospitals, gmaps }, dispatch] = useStateValue();
  const [address, setAddress] = useState('');
  const [displayInput, setDisplayInput] = useState(false)
  // const [hospital, setHospital] = useState('');
  // const [helicopter, setHelicopter] = useState('');
  // const [time, setTime] = useState('');

  const handleChange = (e) => {
    setAddress(e.target.value);
  }

  // const showInput = () => {
  //   if (document.getElementById('show').style.visibility === 'hidden') {
  //     document.getElementById('show').style.visibility = 'visible';
  //   } else {
  //     document.getElementById('show').style.visibility = 'hidden';
  //   }
  // }

  const newPatientLoc= (place) => {
    dispatch({
      type: actionTypes.SET_LOC,
      patientLocal: place
    })
  }

  //Function to check location services access and alert user to enable it.
  errorMessage.getLocation();

  /* EXAMPLE & GUIDE FOR ERROR POPUPS - Replace example text with your message.
  // Only one error popup can exist at a time. The last error must be dismissed
  // before a new one can be called for display. 

  errorMessage.toast.error("Example Text", errorMessage.errorOptions);
  
  //To queue up different error popups at the same time. The error's must have
  //different Id's. The above function creates errors of the same Id, which prevents
  //duplicates. Use the following code to create an error with a unique id to display
  //at the same time.

  errorMessage.toast.error("Example text", {
    toastId: "uniqueID"
    });

  */

  //  what does update results do ??
  return (
    <div className="input-container">
      <div className="location-section">

        {/*ToastContainer is placed anywhere to initialize error popups*/}
        <errorMessage.ToastContainer limit={7} autoClose={false} 
        transition={errorMessage.Zoom} position={"top-center"}/>
        
        <div className="manual-address-input">
          <button className="manual-address-btn"
            onClick={() => setDisplayInput(!displayInput)}
          >Edit Current Address</button>
          {displayInput &&
            (gmaps && <AutoComplete map={gmaps.map} mapApi={gmaps.maps} newPlace={newPatientLoc} />
          )}
        </div>
      </div>
      <br />

      <div className="dropdown">
        <select id="available-hospitals-selection">
          <option value="" disabled selected
            id="available-hospitals">Available Hospitals Nearby</option>
          {!isEmpty(hospitals) && 
            hospitals.map(e => <option> {e.name}</option>)
            // <option>{term[0].name}</option>
           }
        </select>
        {/* {term[0] ? 
             term.map(e => console.log(e.name))
              :null} } */}

        <select id="available-helipads-dropdown">
          <option value="" disabled selected
            id="available-helipads">Helicopter Location</option>
          <option value="site1">Site 1</option>
          <option value="site2">Site 2</option>
        </select>

        <input
          type="text"
          value={address}
          id="estimated-load-time"
          placeholder="Estimated Patient Loading Time (minutes)"
          onChange={handleChange}
        />  

      </div>
    </div>
  );
}

export default InputPage;