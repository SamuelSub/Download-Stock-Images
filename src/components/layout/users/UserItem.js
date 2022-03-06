import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GithubContext from '../../../context/github/githubContext';

// Using destructuring to pull from props the user (props.user.login and so on...)
const UserItem = ( { user } ) => {

  const { getUser } = useContext(GithubContext);

  const downloadImg = (e) => {
    getUser(user.id);
    // console.log(user, user.id)
  }
  
    return (
      <div className="card" onClick={() => downloadImg()}>
        <Link to='/user'>
        <img src={user.urls.small} alt={user.alt_description} />
        <button className='image-overlay'>Download</button>
        <h4>
          {/* <a href={ <Link to='/user'></Link> } className="btn btn-dark btn-sm my-1">Check Profile</a> */}
          {/* <Link to={`/user/`} className="btn btn-dark btn-sm my-1">More</Link> */}
        </h4>
        </Link>
      </div>
    )
}

export default UserItem
