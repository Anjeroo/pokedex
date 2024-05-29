import { useState } from 'react'
import './header.css'



export function Header() {
    return (
        <header className='header'>
            <div className='headerDiv'>
                <h1 className='title1'>Kodus</h1>
                <img className='pokeball' src="./src/assets/pokeball.png" />
                <h1 className='title2'>Pokedex</h1>
            </div>
        </header>
    )
}