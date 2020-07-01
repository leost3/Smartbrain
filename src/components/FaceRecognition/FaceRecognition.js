import React from 'react'

import { Box } from './styles'

export default function ImageLinkForm({ imageUrl,box}) {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                {imageUrl && <img alt='img' id='input-img' src={imageUrl} width='500px' height='auto' />}
                <Box box={box} />
            </div>
        </div>
    )
}

