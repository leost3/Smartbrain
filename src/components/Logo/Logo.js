import React from 'react'

import brain from './brain.png'
import { StyledLogo } from './styles'

export default function Logo() {
    return (
        <div className='ma4 mt0'>
            <StyledLogo className="br2 shadow-2"
                options={{ max: 55 }}
                style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img style={{ paddingTop: '5px' }} src={brain} alt='logo' />
                </div>
            </StyledLogo>
        </div>
    )
}
