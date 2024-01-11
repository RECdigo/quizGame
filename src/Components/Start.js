import React, { useState } from 'react';
import playSound from "../Sounds/play.mp3"

function playStart() {

  new Audio(playSound).play()

}

const StartGame = ({ onStartToggle, onInputValueChange  }) => {

  const handleStartClick = () => {

    onStartToggle()
    playStart()

  }  

  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {

    setInputValue(e.target.value)
    onInputValueChange(e.target.value)    

  }

  const handleFormSubmit = (e) => {

    e.preventDefault()

    if (inputValue.trim() !== '') {

      console.log('Form submitted with value:', inputValue)

    } else {

      alert('Input cannot be blank.')

    }

  }

  return (

    <div className='mainSettings'>

      <div className='mainWin'>
        
        <input className='name' type='text' 
        placeholder='TYPE YOUR NAME' onChange={handleInputChange}
        required></input>

        <button className='btnName' onClick={handleStartClick} 
        disabled={inputValue.trim() === ''}>Start</button>

      </div>

    </div>
  );
};

function Start({ start, toggleStart, onInputValueChange  }) {  

  return (
    <>
      <StartGame onStartToggle={toggleStart} onInputValueChange={onInputValueChange} />
      
    </>
  )
}

export default Start;
