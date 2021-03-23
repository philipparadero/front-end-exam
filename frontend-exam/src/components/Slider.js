import React, { useState } from 'react'

import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import { SliderData } from './SliderData';
import HeroSection from './HeroSection';
import './Slider.css';

const Slider = () => {
    const [current, setCurrent] = useState(0);
    const length = SliderData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current+1)
       
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current-1);
    }

    const dotOneClick = ()=>{
        setCurrent(0)
        window.scrollTo(0, 0)
    }

    const dotTwoClick = ()=>{
        setCurrent(1)
        window.scrollTo(0, 0)
    }

    const dotThreeClick = ()=>{
        setCurrent(2)
        window.scrollTo(0, 0)
    }

    return (
      <section className='slider'>
        {SliderData.map((data, index) =>{
                return (
                    <div className='slide' key={index}>
                    {index === current && (
                        <HeroSection
                            headline={data.headline}
                            img={data.img}
                            alt={data.alt}
                            date={data.date}
                        />
                    )}
                </div>
                );
            })
        }
    
        <div className="slider-circles-container">
            <span onClick={dotOneClick} className={current === 0 ? 'dot-black' : 'dot'}></span>
            <span onClick={dotTwoClick} className={current === 1 ? 'dot-black' : 'dot'}></span>
            <span onClick={dotThreeClick} className={current === 2 ? 'dot-black' : 'dot'}></span>
        </div>
        <div className="arrows">
            <RiArrowLeftSLine className='left-arrow' onClick={prevSlide} />
            <RiArrowRightSLine className='right-arrow' onClick={nextSlide} />
        </div>
      </section>
    );
}

export default Slider;
