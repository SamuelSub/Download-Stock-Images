import React, { Component } from 'react';

class UserItem extends Component {
  
  state = {
    id: 'id',
    login: 'mojombo',
    avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/mojombo'
  }

  render() {

    // Using Destructuring so we dont keep repeating this.state in every ocation
    const { login, avatar_url, html_url } = this.props.user;

    return (
      <div className="card text-center">
        <img src={avatar_url} alt="" className="round-img" style={ { width: '60px' } }/>
        <h3>{login}</h3>
        <h4>
          <a href={html_url} className="btn btn-dark btn-sm my-1">Check Profile</a>
        </h4>
      </div>
    )
  }
}

export default UserItem
