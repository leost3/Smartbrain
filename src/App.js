import './App.css'

import React, { useEffect, useState } from 'react'
import Particles from 'react-particles-js'

import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Logo from './components/Logo/Logo'
import Navigation from './components/Navigation/Navigation'
import Rank from './components/Rank/Rank'
import Register from './components/Register/Register'
import Signin from './components/Signin/Signin'


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

const initialUser = {
  id: '',
  name: '',
  email: '',
  password: '',
  entries: 0,
  joined: ''
}

function App() {

  const [input, setInput] = useState('https://vignette.wikia.nocookie.net/dragonballfighterz/images/e/ea/Goku_Artwork.png/revision/latest/top-crop/width/360/height/450?cb=20180902173423')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
  const [route, setRoute] = useState('signin')
  const [isSignedin, setIsSignedin] = useState(true)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  })

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

  const updateEntries = () => {
    fetch('http://localhost:3002/image', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3002'
      },
      body: JSON.stringify({
        id: user.id
      })
    })
      .then(response => response.json())
      .then(entries => {
        setUser({
          ...user,
          entries
        })
      })
      .catch(error => console.log(error))
  }

  function displayFaceBox(box) {
    setBox(box)
  }

  function onInputChange(event) {
    setInput(event.target.value)
  }

  function onButtonSubmit(event) {
    setImageUrl(input)
      fetch('http://localhost:3002/imageUrl', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3002'
        },
        body: JSON.stringify({
          input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          updateEntries()
        }
        displayFaceBox(calculateFaceLocation(response))
      })
      .catch(err => console.error(err))
  }

  function onRouteChange(route) {
    if (route === 'signout') {
      setIsSignedin(false)
      setUser(initialUser)
      setBox({})
      setImageUrl('')
      
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
          {JSON.stringify(user)}
          <Logo />
          <Rank name={user.name} entries={user.entries} />
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
            ? <Signin loadUser={setUser} onRouteChange={onRouteChange} />
            : <Register loadUser={setUser} onRouteChange={onRouteChange} />
        )


      }


    </div>
  );
}

export default App;
