import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {

  return (
    <Fragment>
      <img src={spinner} alt="Loading..." style={ { width: '400px', height: '400px', display: 'block', margin: 'auto' } }/>
    </Fragment>
  )
}

export default Spinner
