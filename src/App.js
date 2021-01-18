import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/layout/users/Users';
import Search from './components/layout/users/Search';
import Alert from './components/layout/Alert';
import About from './components/layout/pages/About';
import User from './components/layout/users/User';
import './App.css';


const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlertType] = useState(null);
  
  const searchUsers = (text) => {

    setLoading(true);

    fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => { 
        setUsers(data.items); 
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  // Search single user

  const getUser = (username) => {

    setLoading(true);

    fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => { 
        setUser(data); 
        setLoading(false);
      })
      .catch(err => console.log(err));
  }
  // Get User Repos

  const getUserRepos = (username) => {
    setLoading(true);

    fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => { 
        setRepos(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }  

  const clearUsers = () => {
    if(users.length !== 0) {
      setUsers([]); 
      setLoading(false);
    }
  }

  const setAlert = (message, type) => {
    setAlertType( { message: message, type: type } );
    setTimeout(() => {
      setAlertType(null);
    }, 3000);
  }


    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert}/>

            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                   <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={setAlert}/>
                   <Users loading={loading} users={users}/>
                </Fragment>
              )}/> 

              <Route exact path='/about' component={About}/>

              <Route exact path='/user/:login' render={props => (
                <User { ...props } getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading}/>
              )}/>
              
            </Switch>
           
          </div>
        </div>
      </Router>
    );
}

export default App;