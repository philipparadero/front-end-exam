import React from 'react'
import './HeroSection.css'

const HeroSection = ( {headline, img, alt, date} ) => {
    return (
        <div className='hero-section-container'>
            <div className="slider-image-container"> 
                <div className="slider-headline-container">
                    <h2 className="slider-headline">{headline}</h2>
                    <p className="slider-date">{date}</p>
                </div>
                <img className='slider-image'src={img} alt={alt}/>
            </div>
        </div>
    )
}

export default HeroSection
