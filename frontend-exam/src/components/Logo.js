import React from 'react'
import { IoGameController } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = ({style}) => {
    return (
        <div onClick={()=>window.scrollTo(0, 0)} className='logo-container'>
             <IoGameController className={style==='lightBg'? 'logo-icon' : 'logo-icon white' }/>
             <Link to='/' className={style==='lightBg' ? 'logo-text' : 'logo-text white'}>BLOG</Link>
        </div>
    )
}

export default Logo
