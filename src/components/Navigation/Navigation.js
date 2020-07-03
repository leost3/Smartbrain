import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Navigation({ onSignOut, isSignedIn }) {


    const history = useHistory()

    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    onClick={() => {
                        onSignOut()
                        history.push('/')
                    }}
                    className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>

        )
    }
    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p
                className='f3 link dim black underline pa3 pointer'>
                <Link to='/'>
                    Sign In
                </Link>
            </p>
            <p
                className='f3 link dim black underline pa3 pointer'>
                <Link to='/register'>
                    Register
                </Link>
            </p>
        </nav>
    )
}
