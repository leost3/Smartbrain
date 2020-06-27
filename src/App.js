import './App.css'

import Clarifai from 'clarifai'
import React, { useState } from 'react'
import Particles from 'react-particles-js'

import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Logo from './components/Logo/Logo'
import Navigation from './components/Navigation/Navigation'
import Rank from './components/Rank/Rank'
import Register from './components/Register/Register'
import Signin from './components/Signin/Signin'

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

  const [input, setInput] = useState('https://vignette.wikia.nocookie.net/dragonballfighterz/images/e/ea/Goku_Artwork.png/revision/latest/top-crop/width/360/height/450?cb=20180902173423')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
  const [route, setRoute] = useState('signin')
  const [isSignedin, setIsSignedin] = useState(true)

  function calculateFaceLocation(data) {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('input-img')
    const width = +image.width
    const height = +image.height
    return {
      left: clarifaiFace.left_col * width,
      top: clarifaiFace.top_row * height,
      right: width - clarifaiFace.right_col * width,
      bottom: height - clarifaiFace.bottom_row * height,
    }
  }


  function displayFaceBox(box) {
    setBox(box)
  }

  function onInputChange(event) {
    setInput(event.target.value)
  }

  function onButtonSubmit(event) {
    setImageUrl(input)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(err => console.error(err))
  }

  function onRouteChange(route) {
    if (route === 'signout') {
      setIsSignedin(false)
    } else if (route === 'home') {
      setIsSignedin(true)
    }
    setRoute(route)
  }

  return (
    <div className="App">
      <Particles
        className='particles'
        params={partcilesOptions} />
      <Navigation
        isSignedIn={isSignedin}
        onRouteChange={onRouteChange}
      />
      {route === 'home'
        ?
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            value={input}
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition
            imageUrl={imageUrl}
            box={box}
          />
        </>

        : (
          route === 'signin'
            ? <Signin onRouteChange={onRouteChange} />
            : <Register onRouteChange={onRouteChange} />
        )


      }


    </div>
  );
}

export default App;
