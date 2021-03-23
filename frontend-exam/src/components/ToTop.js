import React from 'react'
import { RiArrowUpSLine } from 'react-icons/ri'
import './ToTop.css'

const ToTop = () => {
    return (
        <div className='top-button' onClick={()=>window.scrollTo(0, 0)}>
            <div className="up-arrow-container">
                <RiArrowUpSLine className='up-arrow'/>
            </div>
            <div className="top-text-container">
                <h3 className='top-text'>TOP</h3>
            </div>
        </div>
    )
}

export default ToTop
