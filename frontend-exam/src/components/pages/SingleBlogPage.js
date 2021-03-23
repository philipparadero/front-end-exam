import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import './SingleBlogPage.css'
import img from '../../images/heroimagea.png'
import Breadcrumb from '../Breadcrumb';
import { Button } from '../Button';
import { AuthContext, LogInContext } from '../../UserContext';

const SingleBlogPage = () => {

    const intialData ={
        "post": {
        "id": 1,
        "title": "Initial Data!",
        "content": "Just an initial data",
        "image": null,
        "createdAt": "2019-07-01 09:48:22.879 +00:00",
        "comments":[{
          "content":"sample content",
        }]
        }
    }

  const { setIsSlider } = useContext(LogInContext);
  const { authCode } = useContext(AuthContext);
  const [data, setData] = useState(intialData)
  const [isLoading2, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('')
  const textinput = useRef(null)
  const history = useHistory();
  let params = useParams();

  const handleEdit = () =>{

  }
    useEffect(() => {
      setIsSlider(true)
      window.scroll(0,0)
        try {
          const onPostClick = async () => {
            const dataResult = await axios({
              url: 'http://localhost:4000/graphql',
              method: 'POST',
              data: {
              query: 
              `query{
                post(id:${params.id}){
                  id
                  title
                  content
                  image
                  createdAt
                  comments{
                    content
                    createdAt
                  }
                }
              }`
              }
            })
            setData(dataResult.data.data.post);
            setIsLoading(false);
          }
          onPostClick();
        } catch(err){
          setErr(err)
          setIsLoading(false)
        }
      }, [])

      useEffect(() => {
        setComments(data.comments)
      }, [data])
      
      const handleSubmitComment = (event) => {
        event.preventDefault();
        try {
          const submitComment = async () => {
            await axios({
              url: 'http://localhost:4000/graphql',
              method: 'POST',
              data: {
                query: `mutation {
                  addComment(postId:${params.id}, content:"${newComment}"){
                    id
                    postId
                    content
                    createdAt
                  }
                }`
              }
            })
          }
          submitComment();
        } catch (error) {
        
        }
        history.push('/')
        setTimeout(()=>{ history.push(`/single-blog-page/${params.id}`) }, 100);
        window.scroll(1000, 1000)
      }
     
      return (
        <div className="single-blog-page">
            { isLoading2 ? (<div>Loading Mode....</div>):(
              <div className='single-blog-section'>
                <div className="single-blog-breadcrumb-btns-container">
                  <Breadcrumb second_link={data.title}/>
                  <div className="single-blog-edit-btn">
                      {authCode && <Button onClick={handleEdit} buttonStyle='btn--blank'>Edit Post</Button>}
                  </div>
                </div>
                <div className="single-blog-post-container">
                    <div className="single-blog-date">{data.createdAt}</div>
                    <div className="single-blog-title">{data.title}</div>
                    <div className="single-blog-image"><img src={img} alt={data.title}/></div>
                    <div className="single-blog-content">{data.content}</div>
                    <div className="single-blog-comment-section">
                      <h2 className="single-blog-comment-header">
                        COMMENT
                      </h2>
                      {comments && comments.map((comment, index)=>{
                        return (
                          <div  key={index} className='single-blog-comment-container'>
                            <div className='single-blog-comment'> {comment.content} </div>
                            <div className='single-blog-comment-date'>{comment.createdAt} </div>
                          </div>
                        )
                      })}
                    </div>
                    <form className="single-blog-add-comment">
                      <textarea id="blog-title" name="new-comment" rows="5"  placeholder='Write comment' ref={textinput} onChange={e=> setNewComment(e.target.value)} />
                      <div className="single-blog-comment-submit">
                       <Link to={`/single-blog-page/${params.id}`}> <Button onClick={handleSubmitComment}>Submit</Button></Link>
                      </div>
                    </form>
                </div>   
            </div>
            )}
        </div>
    )
}

export default SingleBlogPage
