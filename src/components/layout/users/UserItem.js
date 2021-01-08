import React from 'react';
import PropTypes from 'prop-types';

// Using destructuring to pull from props the user (props.user.login and so on...)
const UserItem = ( { user: { login, avatar_url, html_url } } ) => {

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

UserItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserItem
