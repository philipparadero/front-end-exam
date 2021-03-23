import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard';
import './BlogContainer.css'
import { Button } from './Button';
import { AuthContext } from '../UserContext';
import { Link } from 'react-router-dom';


const BlogContainer = () => {
  
  const { authCode } = useContext(AuthContext);
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [limit, setLimit] = useState(6)

  const loadMore = () => {
    setLimit(limit+3)
  }

  useEffect(() => {
    try {
      const queryBlogs = async () => {
        const dataResult = await axios({
          url: 'http://localhost:4000/graphql',
          method: 'POST',
          data: {
          query: `
            query{
              posts(pagination:{limit:${limit}}){
              title
              content
              image
              createdAt
              id
            }
          }`
          }
        })
        setData(dataResult.data.data.posts);
        setIsLoading(false);
      }
      queryBlogs();
    } catch(err){
      setErr(err)
      setIsLoading(false)
    }
  }, [limit])

    return (
        <div className="blog-container-section">
          <div className='blog-container-container'>
          <div className="blog-container-header">
            <div className="blog-header">NEWS</div>
            { authCode ? (<div className="new-post-button">
             <Link to='/create-new-post'><Button buttonStyle='btn--blank'>CREATE NEW POST</Button></Link> 
            </div>) : (<div></div>) }
          </div>
          {isLoading? (<div>Loading Mode....</div>):(
           <div className="blog-container-mapped">
             {data.map((item, index)=>{
              return (
                <BlogCard key={index} img={item.image} title={item.title} id={item.id} content={item.content} date={item.createdAt}/>
               )
             })}
           </div>
          )}
          <div className='blog-container-btn'>
            <Button id='load-more-btn' onClick={loadMore}>LOAD MORE</Button>
          </div>
          </div>
        </div>
    )
}

export default BlogContainer
