import './App.css'

import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom'

import Navigation from './components/Navigation/Navigation'
import Register from './components/Register/Register'
import Signin from './components/Signin/Signin'
import Profile from './pages/Profile'

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
  const [isSignedin, setIsSignedin] = useState(false)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  })

  const history = useHistory()

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

  function onSignIn(user) {
    setIsSignedin(true)
    setUser(user)
  }


  function onSignOut() {
    setIsSignedin(false)
    setUser(initialUser)
    setBox({})
    setImageUrl('');
    console.log(history)

  }

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isSignedin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Router>
      <Navigation
        isSignedIn={isSignedin}
        onSignOut={onSignOut}
      />
      <Switch>
        <Route path='/' exact>
          <Signin onSignIn={onSignIn} />
        </Route>
        <Route path='/register' exact>
          <Register onSignIn={onSignIn} onSignOut={onSignOut} />
        </Route>
        <PrivateRoute path='/profile' exact>
          <Profile
            partcilesOptions={partcilesOptions}
            name={user.name}
            entries={user.entries}
            value={input}
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
            imageUrl={imageUrl}
            box={box}
          />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
