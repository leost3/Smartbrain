import './App.css'

import React, { useState } from 'react'
import Particles from 'react-particles-js'

import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Logo from './components/Logo/Logo'
import Navigation from './components/Navigation/Navigation'
import Rank from './components/Rank/Rank'

const partcilesOptions = {
  partciles: {
    number: {
      value: 30,
      density: {
        enable:true,
        value_area: 800
      }
    }
  }
}

function App() {

  const [input, setInput] = useState('')

  function onInputChange(event){
    setInput(event.target.value)
  }

  return (
    <div className="App">
      <Particles
        className='particles'
        params={partcilesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} />
      {/*   <FaceRecognition /> */}
    </div>
  );
}

export default App;
