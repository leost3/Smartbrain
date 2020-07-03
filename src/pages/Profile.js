import React from 'react'
import Particles from 'react-particles-js'

import FaceRecognition from '../components/FaceRecognition/FaceRecognition'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm'
import Logo from '../components/Logo/Logo'
import Rank from '../components/Rank/Rank'

function Profile(props) {

    const { partcilesOptions, name, entries, value, onInputChange, onButtonSubmit, imageUrl, box } = props;


    return (
        <>
            <Particles
                className='particles'
                params={partcilesOptions}
            />
            <Logo />
            <Rank name={name} entries={entries} />
            <ImageLinkForm
                value={value}
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition
                imageUrl={imageUrl}
                box={box}
            />
        </>
    )
}

export default Profile;