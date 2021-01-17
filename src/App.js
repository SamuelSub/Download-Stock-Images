import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/layout/users/Users';
import Search from './components/layout/users/Search';
import Alert from './components/layout/Alert';
import About from './components/layout/pages/About';
import User from './components/layout/users/User';
import './App.css';


class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };
  
  searchUsers = (text) => {

    this.setState( { loading: true } );

    fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => {this.setState( { users: data.items, loading: false } )})
      .catch(err => console.log(err));
  }

  // Search single user

  getUser = (username) => {

    this.setState( { loading: true} );

    fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => this.setState( { user: data, loading: false } ))
      .catch(err => console.log(err));
  }
  // Get User Repos

  getUserRepos = (username) => {
    this.setState( { loading: true} );

    fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => this.setState( { repos: data, loading: false } ))
      .catch(err => console.log(err));
  }  

  clearUsers = () => {
    if(this.state.users.length !== 0) {
      this.setState( { users: [], loading: false } );
    }
  }

  setAlert = (message, type) => {
    this.setState( { alert: { message: message, type: type } } );
    setTimeout(() => {
      this.setState( { alert: null } )
    }, 3000);
  }

  render() {

    const { users, user, loading, repos } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert}/>

            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                   <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert}/>
                   <Users loading={loading} users={users}/>
                </Fragment>
              )}/> 

              <Route exact path='/about' component={About}/>

              <Route exact path='/user/:login' render={props => (
                <User { ...props } getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos} user={user} loading={loading}/>
              )}/>

              
              
            </Switch>
           
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
