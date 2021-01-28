import React from 'react';
import { Link } from 'react-router-dom';

// Using destructuring to pull from props the user (props.user.login and so on...)
const UserItem = ( { user: { login, avatar_url } } ) => {
  

    return (
      <div className="card text-center">
        <img src={avatar_url} alt="" className="round-img" style={ { width: '60px' } }/>
        <h3>{login}</h3>
        <h4>
          {/* <a href={ <Link to='/user'></Link> } className="btn btn-dark btn-sm my-1">Check Profile</a> */}
          <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
        </h4>
      </div>
    )
}

export default UserItem
