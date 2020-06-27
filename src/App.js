import './App.css'

import Clarifai from 'clarifai'
import React, { useState } from 'react'
import Particles from 'react-particles-js'

import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Logo from './components/Logo/Logo'
import Navigation from './components/Navigation/Navigation'
import Rank from './components/Rank/Rank'

const app = new Clarifai.App({
  apiKey: '87fb862d16b44210a569c60c45896e31'
})
const partcilesOptions = {
  partciles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {

  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})


  function calculateFaceLocation(data) {
    const clarifaiFace = data.regions[0].region_info.bounding_box
    const image = document.getElementById('input-image')
  }


  function onInputChange(event) {
    setInput(event.target.value)
  }

  function onButtonSubmit(event) {
    setImageUrl(input)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(response => calculateFaceLocation(response))
      .catch(err => console.error(err))
  }

  return (
    <div className="App">
      <Particles
        className='particles'
        params={partcilesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        value={input}
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
