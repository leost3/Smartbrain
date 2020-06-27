import React from 'react'

export default function ImageLinkForm({ imageUrl }) {

    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img  id='input-img' src={imageUrl} width='500px' height='auto' />

            </div>
        </div>
    )
}



// 'https://samples.clarifai.com/face-det.jpg'