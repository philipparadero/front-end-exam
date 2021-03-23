import React from 'react'
import { Link } from 'react-router-dom'
import blogImage from '../images/blog-card-image.png'
import './BlogCard.css'

const BlogCard = ({id, content, title, date}) => {
    const dateFormatted = date.slice(0,10).replaceAll("-", ".")

    return (
        <div className='blog-card-container'>
            <div className="blog-card-image">
                <Link  to={`/single-blog-page/${id}`}>
                    <img src={blogImage} alt={title} className="blog-image"/>
                </Link>
            </div>
            <div className="blog-card-details">
                <div className="blog-card-date">{dateFormatted}</div>
                <Link to={`/single-blog-page/${id}`}> <div className="blog-card-content">{title}</div></Link>
            </div>
        </div>
    )
}

export default BlogCard
