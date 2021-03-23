import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../UserContext'
import Breadcrumb from '../Breadcrumb'
import { Button } from '../Button'
import './NewPost.css'

const NewPost = () => {

    const intialData = {
        "addPost": {
          "createdAt": "2021-03-19 ",
          "content": "Lorem ipsum ",
          "title": "Lorem ipsum t"
        }
    }

    const [title, setTitle] = useState('')
    const [imgLink, setImgLink] = useState('')
    const [content, setContent] = useState('')
    const { authCode } = useContext(AuthContext);
    const [data, setData] = useState(intialData)
    const [isLoading2, setIsLoading] = useState(false);
    const [err, setErr] = useState(null);
    const textInput = useRef(null);
    const history = useHistory();


    const handleCancel =()=>{
        window.scrollTo(0, 0)
    }

    const handleSave = () => {
        
    }
  
    const handleSubmit = (event) => {
        try {
            const addNewPost = async () => {
              const dataResult = await axios({
                url: 'http://localhost:4000/graphql',
                method: 'POST',
                headers: {
                    "Authorization": `${authCode}`
                },
                data: {
                query: 
                `mutation {
                    addPost
                    (post:{title:"${title}",content:"${content}"})
                    {
                      createdAt
                      content
                      title
                      id
                    }
                  }`
                }
              })
              setData(dataResult.data.data.post);
              setIsLoading(false);
            }
            addNewPost();
          } catch(err){
            setErr(err)
            setIsLoading(false)
          }
          event.preventDefault();
          history.push('/')
    }

    return (
        <div className="new-blog-container">
            <div className='new-blog-section'>
                <Breadcrumb second_link='Create New Post'/>
                <form className="new-blog-post-container" onSubmit={handleSubmit}>
                    <div className="new-blog-btns">
                       <Button onClick={handleSave} buttonStyle='btn--blank'>Save Post</Button>
                       <Link to='/'><Button onClick={handleCancel} buttonStyle='btn--blank'>Cancel</Button> </Link>
                    </div>
                    <div className="new-blog-date">"09-19-1992"</div>
                    <div className="new-blog-title-field">
                        <textarea id="blog-title" name="blog-title" rows="2"  placeholder='Title'ref={textInput} onChange={e=> setTitle(e.target.value)} />
                    </div>
                    <div className="new-blog-image-field">
                        <label htmlFor="imageLink">Image Link</label>
                        <input type="text" id="imageLink" name="imageLink" placeholder='https://img.com' ref={textInput} onChange={e=> setImgLink(e.target.value)}/>
                    </div>
                    <div className="new-blog-content-field">
                        <textarea id="blog-content" name="blog-content" rows="10" placeholder='Content' ref={textInput} onChange={e=> setContent(e.target.value)}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPost
