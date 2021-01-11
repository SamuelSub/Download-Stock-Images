import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/layout/users/Users';
import Search from './components/layout/users/Search';

class App extends Component {
  state = {
    users: [],
    loading: false
  };
  
  searchUsers = (text) => {

    this.setState( { loading: true} );

    fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => {this.setState( { users: data.items } )})
      .catch(err => console.log(err));

    this.setState({ loading: false });
  }

  clearUsers = () => {
    if(this.state.users.length !== 0) {
      this.setState( { users: [], loading: false } );
    }
  }

  render() {

    const { users, loading } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false}/>
          <Users loading={loading} users={users}/>
        </div>
      </div>
    );
  }
}

export default App;
