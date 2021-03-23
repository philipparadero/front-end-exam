import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({second_link}) => {
    return (
        <div className="breadcrumbs-container">
            <p className="breadcrumbs">
                <Link to='/'>HOME </Link> {` >  ${second_link}`} 
             </p>
        </div> 
    )
}

export default Breadcrumb
