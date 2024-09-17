import React from 'react'

export const Footer: React.FC = () => {

    const date = new Date()

    return (
        <div className='footer-container'>
            <p>© By Simón Quirós { date.getFullYear() }</p>
        </div>
    )
}
