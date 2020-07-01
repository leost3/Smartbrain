import React from 'react'

export default function Rank({entries, name}) {
    return (
        <div className='ma4 mt0'>
            <div className='white f3'>
                {`${name}, your current entry count is ${entries}`}
            </div>
            <div className='white f1'>
                {'#5'}
            </div>

        </div>
    )
}
