import './App.css';
import React, { useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SinglePage from './components/pages/SinglePage';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SingleBlogPage from './components/pages/SingleBlogPage';
import { AuthContext, LogInContext, RegisterContext } from './UserContext';
import NewPost from './components/pages/NewPost';

function App() {

  const [isSlider, setIsSlider] = useState(true)
  const [isLoginForm, setIsLoginForm]=useState(false)
  const [authCode, setAuthCode] =useState(null)
  
  localStorage.setItem('auth', null)
  localStorage.setItem('slider', true)
  localStorage.setItem('reg', false)

  return (
    <>
    <Router>
        <AuthContext.Provider value={{authCode, setAuthCode}}>
        <RegisterContext.Provider value={{isLoginForm, setIsLoginForm}}>
        <LogInContext.Provider value={{isSlider, setIsSlider}}>
        <Navbar />
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/single-page' exact component={SinglePage}/>
            <Route path='/single-blog-page/:id' exact component={SingleBlogPage}/>
            <Route path='/create-new-post' exact component={NewPost}/>
          </Switch>
        <Footer />
        </LogInContext.Provider>  
        </RegisterContext.Provider>
        </AuthContext.Provider>
      </Router>
    </>
  );
}

export default App;
